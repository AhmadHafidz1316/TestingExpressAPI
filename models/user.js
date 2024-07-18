"use strict";
const { Model, where } = require("sequelize");
const Bcrypt = require("bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        unique: {
          args: true,
          msg: "Name has Already Exist",
        },
        validate: {
          notNull: {
            msg: "Name Field is Empty !!! ",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          isEmail: true,
          notNull: {
            msg: "Email Field is Empty !!! "
          }
        },
        unique: {
          args: true,
          msg: "Email has Already Exist",
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Password Field is Empty !!! ",
          },
          len: {
            args: [6, 17],
            msg: "Password must be between 6 and 10 characters long",
          },
        },
      },
      role_id: {
        type: DataTypes.UUID,
      },
    },
    {
      sequelize,
      modelName: "User",
      hooks: {
        beforeCreate: async(user) => {
          if(user.password){
            const salt = await Bcrypt.genSaltSync(10)
            user.password = Bcrypt.hashSync(user.password, salt)
          }
          if(!user.role_id){
            const roleUser = await sequelize.models.Role.findOne({where: {name: 'user'}})
            user.role_id = roleUser.id
          }
        }
      }
    }
  );
  User.prototype.CorrectPassword = async (reqPassword, passwordDB) => {
    return await Bcrypt.compareSync(reqPassword,passwordDB)
  } 
  return User;
};

'use strict';
const {
  Model
} = require('sequelize');
const Bcrypt = require('bcrypt')
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
  User.init({
    id : {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    email : {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    password : {
      type: DataTypes.STRING,
      allowNull: false
    },
    role_id : {
      type: DataTypes.UUID
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
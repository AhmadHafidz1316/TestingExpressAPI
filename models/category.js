"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Category.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          args: true,
          msg: "Category Name has Already Exist",
        },
        validate: {
          notNull: {
            msg: "Name Field is Empty !!! ",
          },
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Description Field is Empty !!! ",
          },
        },
      },
    },
    {
      hooks: {
        afterValidate: (category, options) => {
          if (category.name) {
            category.name = category.name.toLowerCase();
          }
        },
      },
      sequelize,
      modelName: "Category",
    }
  );
  return Category;
};

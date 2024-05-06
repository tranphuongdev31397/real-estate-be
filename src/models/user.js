"use strict";
const { v4: uuidv4 } = require("uuid");

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.KeyToken, {
        foreignKey: "userId",
        as: "tokens",
      });
    }
  }
  User.init(
    {
      name: {
        type: DataTypes.STRING,
        validate: {
          min: 3,
          max: 50,
        },
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      address: DataTypes.STRING,
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM,
        values: ["ADMIN", "AGENT", "USER"],
        defaultValue: "USER",
      },
      avatar: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  User.beforeCreate((user) => (user.id = uuidv4()));

  return User;
};

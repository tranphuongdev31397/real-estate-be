"use strict";
const { Model } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

module.exports = (sequelize, DataTypes) => {
  class KeyToken extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      KeyToken.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user",
        targetKey: "id",
        onDelete: "CASCADE",
      });
    }
  }
  KeyToken.init(
    {
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      privateKey: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      publicKey: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      refreshToken: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "KeyToken",
    }
  );

  KeyToken.beforeCreate((keyToken) => (keyToken.id = uuidv4()));
  return KeyToken;
};

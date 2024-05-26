"use strict";
const { Model } = require("sequelize");

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

  return KeyToken;
};

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
      });
    }
  }
  KeyToken.init(
    {
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      privateKey: DataTypes.STRING,
      publicKey: DataTypes.STRING,
      refreshToken: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "KeyToken",
    }
  );
  KeyToken.beforeCreate((raw) => (raw.id = uuidv4()));
  return KeyToken;
};

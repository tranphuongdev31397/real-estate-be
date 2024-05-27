"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserMedia extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserMedia.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user",
        targetKey: "id",
        onDelete: "CASCADE",
      });
    }
  }
  UserMedia.init(
    {
      userId: DataTypes.UUID,
      provider: DataTypes.STRING,
      link: DataTypes.STRING,
      icon: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "UserMedia",
    }
  );
  return UserMedia;
};

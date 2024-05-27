"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Comment.belongsTo(models.User, {
        foreignKey: "userId",
        targetKey: "id",
      });
      Comment.belongsTo(models.Property, {
        foreignKey: "propertyId",
        targetKey: "id",
      });
      Comment.belongsTo(models.Comment, {
        foreignKey: "parentId",
        targetKey: "id",
      });
      Comment.hasMany(models.Comment, {
        foreignKey: "parentId",
        as: "replies",
      });
    }
  }
  Comment.init(
    {
      text: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      propertyId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      parentId: {
        type: DataTypes.UUID,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Comment",
    }
  );
  return Comment;
};

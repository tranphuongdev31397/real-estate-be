"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Submission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Submission.belongsTo(models.Property, {
        foreignKey: "propertyId",
        targetKey: "id",
      });
      Submission.belongsTo(models.User, {
        foreignKey: "userId",
        targetKey: "id",
      });
    }
  }
  Submission.init(
    {
      propertyId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Submission",
    }
  );
  return Submission;
};

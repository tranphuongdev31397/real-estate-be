"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Property extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      Property.belongsToMany(models.Feature, {
        through: models.PropertyFeature,
      });

      Property.hasMany(models.Submission, {
        foreignKey: "propertyId",
        as: "submissions",
      });

      Property.hasMany(models.Comment, {
        foreignKey: "propertyId",
        as: "comments",
      });

      Property.belongsTo(models.PropertyType, {
        foreignKey: "propertyId",
        targetKey: "id",
        as: "type",
      });

      Property.belongsTo(models.User, {
        foreignKey: "postedBy",
        targetKey: "id",
        as: "owner",
      });
    }
  }
  Property.init(
    {
      name: {
        type: DataTypes.STRING,
        validate: {
          min: 3,
          max: 50,
        },
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      listingType: {
        type: DataTypes.ENUM,
        values: ["SALE", "RENTAL"],
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM,
        values: ["PENDING", "CANCELED", "APPROVED"],
        defaultValue: "PENDING",
      },
      isAvailable: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      images: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
        defaultValue: [],
      },
      thumbnail: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      bedRoom: {
        type: DataTypes.INTEGER,
      },
      bathRoom: {
        type: DataTypes.INTEGER,
      },
      propertySize: {
        type: DataTypes.FLOAT,
      },
      yearBuilt: {
        type: DataTypes.INTEGER,
      },

      propertyTypeId: {
        type: DataTypes.UUID,
        allowNull: false,
      },

      postedBy: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Property",
    }
  );
  return Property;
};

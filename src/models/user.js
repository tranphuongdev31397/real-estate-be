"use strict";

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

      User.hasMany(models.UserMedia, {
        foreignKey: "userId",
        as: "media",
      });

      User.hasMany(models.Submission, {
        foreignKey: "userId",
        as: "submissions",
      });

      User.hasMany(models.Property, {
        foreignKey: "postedBy",
        as: "properties",
      });

      User.hasMany(models.Comment, {
        foreignKey: "userId",
        as: "comments",
      });

      User.belongsTo(models.Role, {
        foreignKey: "role",
        targetKey: "code",
        as: "roleDetail",
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
      role: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      avatar: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  User.addHook("beforeCreate", async (user) => {
    console.log(user);
    if (!user.role) {
      const defaultRole = await sequelize.models.Role.findOne({
        where: {
          value: "USER",
        },
      });

      return (user.role = defaultRole?.code || null);
    }
  });

  return User;
};

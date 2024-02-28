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
      User.hasOne(models.Auth, {
        foreignKey: {
          name: "userId",
          allowNull: false,
        },
      });
      User.hasMany(models.UserLatter, {
        foreignKey: "userId",
        allowNull: false,
      });
      User.hasMany(models.Dues, {
        foreignKey: {
          name: "userId",
          allowNull: false,
        },
      });
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      address: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      noHome: DataTypes.STRING,
      placeDateBday: DataTypes.DATE,
      gender: DataTypes.STRING,
      blockHome: DataTypes.STRING,
      role: { type: DataTypes.ENUM(["superAdmin", "admin", "member"]) },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};

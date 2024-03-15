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
      image: {
        type: DataTypes.STRING,
        defaultValue:
          "https://tse2.mm.bing.net/th?id=OIP.U2iQ7wNK6ZzTW_traW_-PQHaHa&pid=Api&P=0&h=180",
      },
      role: {
        type: DataTypes.ENUM([
          "superAdmin",
          "sekretaris",
          "bendahara",
          "member",
        ]),
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};

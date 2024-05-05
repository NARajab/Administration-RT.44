"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Umkm extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Umkm.hasMany(models.ImageUmkm, {
        foreignKey: "umkmId",
        allowNull: false,
      });
    }
  }
  Umkm.init(
    {
      name: DataTypes.STRING,
      owner: DataTypes.STRING,
      description: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Umkm",
    }
  );
  return Umkm;
};

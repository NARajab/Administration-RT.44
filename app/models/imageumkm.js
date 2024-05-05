"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ImageUmkm extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ImageUmkm.belongsTo(models.Umkm, {
        foreignKey: "umkmId",
        allowNull: false,
      });
    }
  }
  ImageUmkm.init(
    {
      umkmId: DataTypes.INTEGER,
      imageUrl: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "ImageUmkm",
    }
  );
  return ImageUmkm;
};

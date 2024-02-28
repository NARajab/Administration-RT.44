'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Dues extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Dues.init({
    userId: DataTypes.INTEGER,
    duesType: DataTypes.STRING,
    price: DataTypes.FLOAT,
    status: DataTypes.STRING,
    paymentDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Dues',
  });
  return Dues;
};
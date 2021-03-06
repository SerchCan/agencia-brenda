'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Sales extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Sales.init({
    productId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    total: DataTypes.FLOAT,
  }, {
    sequelize,
    modelName: 'Sales',
  });
  return Sales;
};
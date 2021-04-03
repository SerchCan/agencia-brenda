'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Invoices extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Invoices.init({
    legalName: DataTypes.STRING,
    email: DataTypes.STRING,
    rfc: DataTypes.STRING,
    salesIds: DataTypes.JSON,
    invoiceId: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Invoices',
  });
  return Invoices;
};
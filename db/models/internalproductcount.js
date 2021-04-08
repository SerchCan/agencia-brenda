'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class InternalProductCount extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  InternalProductCount.init({
    seq: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'InternalProductCount',
  });
  return InternalProductCount;
};
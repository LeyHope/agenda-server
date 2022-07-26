'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Deletar extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Deletar.init({
    data_agendamento: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Deletar',
  });
  return Deletar;
};
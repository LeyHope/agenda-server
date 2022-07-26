'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Servicos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Servicos.hasOne(models.Agendamento, {
        foreignKey: 'servico_id'
      })
    }
  }
  Servicos.init({
    nomeServico: DataTypes.STRING,
    tempoServicoMin: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Servicos',
  });
  return Servicos;
};
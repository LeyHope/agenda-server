'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Agendamento extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Agendamento.belongsTo(models.Pessoas, {
        foreignKey: 'cliente_id'
      })
      Agendamento.belongsTo(models.Funcionarios, {
        foreignKey: 'funcionario_id'
      })
      Agendamento.belongsTo(models.Servicos, {
        foreignKey: 'servico_id'
      })
    }
  }
  Agendamento.init({
    data_agendamento: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Agendamento',
  });
  return Agendamento;
};
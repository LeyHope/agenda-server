'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Funcionarios extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Funcionarios.hasOne(models.Agendamento, {
        foreignKey: 'funcionario_id'
      })
    }
  }
  Funcionarios.init({
    nome: 
    {
      type: DataTypes.STRING,
      allowNull: false
    },
    contrato: 
    {
      type: DataTypes.STRING,
      allowNull: false
    },
    cpf: 
    {
      type: DataTypes.STRING,
      allowNull: false
    },
    cep: 
    {
      type: DataTypes.STRING,
      allowNull: false
    },
    bairro: 
    {
      type: DataTypes.STRING,
      allowNull: false
    },
    rua: 
    {
      type: DataTypes.STRING,
      allowNull: false
    },
    numero: 
    {
      type: DataTypes.STRING,
      allowNull: false
    },
    telefone: 
    {
      type: DataTypes.STRING,
      allowNull: false
    },
    telefone_2: 
    {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Funcionarios',
  });
  return Funcionarios;
};
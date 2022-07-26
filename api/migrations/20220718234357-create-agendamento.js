'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Agendamentos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
        data_agendamento: {
        type: Sequelize.DATE
      },
      
      cliente_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Pessoas', key: 'id' }
      },
      funcionario_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Funcionarios', key: 'id' }
      },
      servico_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Servicos', key: 'id' }
      },
      
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Agendamentos');
  }
};
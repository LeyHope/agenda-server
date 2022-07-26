'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Servicos', [
      {
        nomeServico: 'Corte de barba',
        tempoServicoMin: '20',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nomeServico: 'Corte de cabelo',
        tempoServicoMin: '20',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nomeServico: 'Corte de barba e cabelo',
        tempoServicoMin: '40',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
    
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Servicos', null, {});
    
  }
};

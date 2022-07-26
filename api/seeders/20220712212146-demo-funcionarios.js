'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('Funcionarios', [{
       nome: 'Thiago Thiago',
       contrato: 'dono',
       createdAt: new Date(),
       updatedAt: new Date()
     }], {});

  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('Funcionarios', null, {});

  }
};

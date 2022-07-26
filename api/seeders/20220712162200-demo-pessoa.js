'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Pessoas', [{

      nome: 'Wesley Maia',
      telefone: '1122223333',
      createdAt: new Date(),
      updatedAt: new Date()

    }], {});

  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('Pessoas', null, {});
  }
};

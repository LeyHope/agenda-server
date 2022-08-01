'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Funcionarios', 'cpf', {
      type: Sequelize.STRING,
      allowNull: false,
    })
    await queryInterface.addColumn('Funcionarios', 'cep', {
      type: Sequelize.STRING,
      allowNull: false,
    })
    await queryInterface.addColumn('Funcionarios', 'bairro', {
      type: Sequelize.STRING,
      allowNull: false,
    })
    await queryInterface.addColumn('Funcionarios', 'rua', {
      type: Sequelize.STRING,
      allowNull: false,
    })
    await queryInterface.addColumn('Funcionarios', 'numero', {
      type: Sequelize.STRING,
      allowNull: false,
    })
    await queryInterface.addColumn('Funcionarios', 'telefone', {
      type: Sequelize.STRING,
      allowNull: false,
    })
    await queryInterface.addColumn('Funcionarios', 'telefone_2', {
      type: Sequelize.STRING,
      allowNull: false,
    })




  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Funcionarios', 'cpf')
    await queryInterface.removeColumn('Funcionarios', 'cep')
    await queryInterface.removeColumn('Funcionarios', 'bairro')
    await queryInterface.removeColumn('Funcionarios', 'rua')
    await queryInterface.removeColumn('Funcionarios', 'numero')
    await queryInterface.removeColumn('Funcionarios', 'telefone')
    await queryInterface.removeColumn('Funcionarios', 'telefone_2')
  }
};

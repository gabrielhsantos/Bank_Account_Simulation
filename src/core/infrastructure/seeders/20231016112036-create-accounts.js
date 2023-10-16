'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('accounts', [
      {
        number: '17010-8',
        type: 'CHECKING',
        balance: 600,
        active: true,
      },
      {
        number: '12345-6',
        type: 'CHECKING',
        balance: 1000,
        active: true,
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('accounts', null, {});
  }
};

'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
    */
      Example:
      return queryInterface.bulkInsert('Devices', [{
        numberphone: '0999999999',
        marca: "iphone",
        modelo:"s5",
        createdAt: Date(),
        updatedAt: Date()  
      }], {});



  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};

'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Battery_usages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fecha_y_hora: {
        type: Sequelize.DATE
      },
      porcentaje: {
        type: Sequelize.INTEGER
      },
      DeviceId: {
        type: Sequelize.INTEGER,
        allowNull: false,

        references: {      
          model: 'Devices',
          key: 'id'
        }
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Battery_usages');
  }
};
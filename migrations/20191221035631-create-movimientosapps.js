'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Movimientosapps', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fecha_uso: {
        type: Sequelize.DATE
      },
      hora: {
        type: Sequelize.INTEGER
      },
      minutos: {
        type: Sequelize.INTEGER
      },
      segundos: {
        type: Sequelize.INTEGER
      },
      UsageAppsId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {      
          model: 'Usagestatsappsbgs',
          key: 'id'
        }
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
    return queryInterface.dropTable('Movimientosapps');
  }
};
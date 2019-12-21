'use strict';
module.exports = (sequelize, DataTypes) => {
  const Movimientosapps = sequelize.define('Movimientosapps', {
    fecha_uso: DataTypes.DATE,
    hora: DataTypes.INTEGER,
    minutos: DataTypes.INTEGER,
    segundos: DataTypes.INTEGER
  }, {});
  Movimientosapps.associate = function(models) {
    // associations can be defined here
    Movimientosapps.belongsTo(models.Usagestatsappsbg);
    Movimientosapps.belongsTo(models.Device);
  };

  Movimientosapps.CrearUsageApps = (movimientos_data, transaction)=>{
    return new Promise((resolve, reject)=>{
      return Movimientosapps.create(movimientos_data, {transaction}).then(result=>{
        return resolve(result);
      }).catch(fail=>{
        return reject(fail);
      });
    });
  };

  return Movimientosapps;
};
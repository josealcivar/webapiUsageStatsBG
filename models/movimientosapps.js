'use strict';
module.exports = (sequelize, DataTypes) => {
  const Movimientosapp = sequelize.define('Movimientosapp', {
    fecha_uso: DataTypes.DATE,
    hora: DataTypes.INTEGER,
    minutos: DataTypes.INTEGER,
    segundos: DataTypes.INTEGER
  }, {});
  Movimientosapp.associate = function(models) {
    // associations can be defined here
    Movimientosapp.belongsTo(models.Device);
    Movimientosapp.belongsTo(models.Usagestatsappsbg,{ foreignKey: 'id'});
    
    
  };

  Movimientosapp.CrearMovimientos = (movimientos_data, transaction)=>{
    return new Promise((resolve, reject)=>{
      return Movimientosapp.create(movimientos_data, {transaction}).then(result=>{
        
        console.log("result movimientos");
        console.log(result);
        return resolve(result);
      }).catch(fail=>{
        //transaction.rollback();
        console.log("fail movimientos");
        console.log(fail);
        return reject(fail);
      });
    });
  };

  return Movimientosapp;
};
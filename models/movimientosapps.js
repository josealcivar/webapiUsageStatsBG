'use strict';

var moment = require('moment');

module.exports = (sequelize, DataTypes) => {
  const Movimientosapp = sequelize.define('Movimientosapp', {
    fecha_uso: DataTypes.DATE,
    hora: DataTypes.INTEGER,
    minutos: DataTypes.INTEGER,
    segundos: DataTypes.INTEGER,
    num_veces:DataTypes.INTEGER
  }, {});
  Movimientosapp.associate = function(models) {
    // associations can be defined here
    Movimientosapp.belongsTo(models.Device,{ foreignKey: 'id'});
    Movimientosapp.belongsTo(models.Usagestatsappsbg,{ foreignKey: 'id'});
    
    
  };

  Movimientosapp.CrearMovimientos = (movimientos_data, transaction)=>{
    return new Promise((resolve, reject)=>{
      return Movimientosapp.create(movimientos_data, {transaction}).then(result=>{
        return resolve(result);
      }).catch(fail=>{
        //transaction.rollback();
        console.log("fail movimientos");
        console.log(fail);
        return reject(fail);
      });
    });
  };

  Movimientosapp.GetMovimiento =(movimientos_data, transaction)=>{
    return new Promise((resolve, reject)=>{
      return Movimientosapp.findOne({
        where:{
          $and:[
            {
              fecha_uso:{
                $gt: moment(moment.tz('America/Guayaquil')).subtract(1, "days"),
                $lte: moment(moment.tz('America/Guayaquil'))
              }
            },
            {
              UsageAppsId:movimientos_data.UsageAppsId
            },
            {
              DeviceId:movimientos_data.DeviceId
            },
          ]
        }
      }).then(result=>{
        return resolve(result);
      }).catch(fail=>{
        return reject(fail);
      });
    });
  };

  Movimientosapp.UpdateMovimiento = (movimientos_data, transaction)=>{
    return new Promise((resolve, reject)=>{
      return Movimientosapp.update(movimientos_data,{
        where:{
          $and:[
            {
              fecha_uso:{
                $gt: moment(moment.tz('America/Guayaquil')).subtract(1, "days"),
                $lte: moment(moment.tz('America/Guayaquil'))
              }
            },
            {
              UsageAppsId:movimientos_data.UsageAppsId
            },
            {
              DeviceId:movimientos_data.DeviceId
            },
          ]
        },
        
      },{transaction}).then(result=>{
        console.log("result UPDATE");
        
        return resolve(result);
      }).catch(fail=>{
        //transaction.rollback();
        console.log("fail update movimientos");
        console.log(fail);
        return reject(fail);
      });
    });
  };
  Movimientosapp.ActualizaMovimiento = async (movimientos_data, transaction)=>{
    let movimiento = await Movimientosapp.GetMovimiento(movimientos_data);
    if(movimiento!=null || movimiento != undefined)
    {
      await Movimientosapp.UpdateMovimiento(movimientos_data, transaction);
    }else{
      await Movimientosapp.CrearMovimientos(movimientos_data, transaction);
    }
  };

  return Movimientosapp;
};
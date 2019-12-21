'use strict';
module.exports = (sequelize, DataTypes) => {
  const Device = sequelize.define('Device', {
    numberphone: DataTypes.STRING,
    marca: DataTypes.STRING,
    modelo: DataTypes.STRING
  }, {});
  Device.associate = function(models) {
    // associations can be defined here
  };


  Device.GetDevice = (ll_device)=>{
    return new Promise((resolve, reject)=>{
      return Device.findOne({
        where:{
          numberphone:ll_device
        }
      }).then(result=>{
        return resolve(result);
      }).catch(fail=>{
        return reject(fail);
      });
    });
  };

  Device.CrearUsageApps = (device_data, transaction)=>{
    return new Promise((resolve, reject)=>{
      return Device.create(device_data, {transaction}).then(result=>{
        return resolve(result);
      }).catch(fail=>{
        return reject(fail);
      });
    });
  };

  return Device;
};
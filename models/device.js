'use strict';
module.exports = (sequelize, DataTypes) => {
  const Device = sequelize.define('Device', {
    numberphone: DataTypes.STRING,
    marca: DataTypes.STRING,
    modelo: DataTypes.STRING
  }, {
    indexes:[
      {
        unique: false,
        fields:['numberphone']
      }
     ]
  });
  Device.associate = function(models) {
    // associations can be defined here
    Device.hasMany(models.Movimientosapp, { foreignKey: 'DeviceId' });
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

  Device.CreateDevices =  async (device_data, transaction)=>{
    let deviceid= await Device.GetDevice(device_data.numberphone);
    
    if(deviceid!= null || deviceid!= undefined) return deviceid;
    return new Promise((resolve, reject)=>{
      return Device.create(device_data, {transaction}).then(result=>{
        
        return resolve(result);
      }).catch(fail=>{
        console.log("fail device create");
        console.log(fail);
        //transaction.rollback();
        return reject(fail);
      });
    });
  };


  return Device;
};
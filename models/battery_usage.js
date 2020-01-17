'use strict';
module.exports = (sequelize, DataTypes) => {
  const Battery_usage = sequelize.define('Battery_usage', {
    fecha_y_hora: DataTypes.DATE,
    porcentaje: DataTypes.INTEGER
  }, {});
  Battery_usage.associate = function(models) {
    // associations can be defined here
    Battery_usage.belongsTo(models.Device,{ foreignKey: 'id'});
  };

  Battery_usage.CreateBatteryUsage =  async (battery_data, transaction)=>{
    return new Promise((resolve, reject)=>{
      return Battery_usage.create(battery_data, {transaction}).then(result=>{
        
        return resolve(result);
      }).catch(fail=>{
        console.log("fail battery create");
        console.log(fail);
        //transaction.rollback();
        return reject(fail);
      });
    });
  };


  return Battery_usage;
};
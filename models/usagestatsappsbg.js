'use strict';
module.exports = (sequelize, DataTypes) => {
  const Usagestatsappsbg = sequelize.define('Usagestatsappsbg', {
    nombre_app: DataTypes.STRING
  }, {});
  Usagestatsappsbg.associate = function(models) {
    // associations can be defined here
  };

  Usagestatsappsbg.GetAppsName = (ll_nameapp)=>{
    return new Promise((resolve, reject)=>{
      return Usagestatsappsbg.findOne({
        where:{
          nombre_app:ll_nameapp
        }
      }).then(result=>{
        return resolve(result);
      }).catch(fail=>{
        return reject(fail);
      });
    });
  };


  

  Usagestatsappsbg.CrearUsageApps = (usageapps, transaction)=>{
    return new Promise((resolve, reject)=>{
      return Usagestatsappsbg.create(usageapps, {transaction}).then(result=>{
        return resolve(result);
      }).catch(fail=>{
        return reject(fail);
      });
    });
  };

  return Usagestatsappsbg;
};
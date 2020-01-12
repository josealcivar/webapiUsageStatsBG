'use strict';
module.exports = (sequelize, DataTypes) => {
  const Usagestatsappsbg = sequelize.define('Usagestatsappsbg', {
    nombre_app: DataTypes.STRING
  }, {});
  Usagestatsappsbg.associate = function(models) {
    // associations can be defined here Usagestatsappsbgs
    Usagestatsappsbg.hasMany(models.Movimientosapp, { foreignKey: 'UsageAppsId' });
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


  

  Usagestatsappsbg.CrearUsageApps = async (usageapps, transaction)=>{
    console.log(usageapps);
    let usageapp= await Usagestatsappsbg.GetAppsName(usageapps.nombre_app);

    if(usageapp!= null || usageapp!= undefined) return usageapp;
    return new Promise((resolve, reject)=>{
      return Usagestatsappsbg.create(usageapps, {transaction}).then(result=>{
        //transaction.commit();
        return resolve(result.get('id'));
      }).catch(fail=>{
        console.log("fail apps usage create");
        console.log(fail);
        //stransaction.rollback();
        return reject(fail);
      });
    });
  };

  return Usagestatsappsbg;
};
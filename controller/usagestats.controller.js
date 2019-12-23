'use strict';

const sequelize	= require('../models').sequelize;
const modelo = require('../models');

let dataCliente;

const UsageStatsBGPost = async (req, res)=>{
   // sequelize.query('CALL GetAllClientes()', 

   let datos={
    app_name:    req.body.razonsocial, 
    num_celular: req.body.num_celular,
    movimientos:{
        fecha: req.body.fecha,
        hora: req.body.hora,
        minutos: req.body.minutos,
        segundos: req.body.segundo,
        UsageAppsId: 0,
        DeviceId: 0
    }
   };
  
   try{
    let t = await inicializarTransaccion();
    let result_app = await modelo.Usagestatsappsbg.GetAppsName(datos.app_name);
    let result_telef = await modelo.Device.GetDevice(datos.num_celular);

    
    let save_movimientos = await modelo.Movimientosapps.CrearUsageApps(datos.movimientos,t);

        console.log("guardo el cliente");
        t.commit();
     res.status(200).json(save_movimientos);
}catch(err){

    t.rolback();
    res.status(500).json(err);

}


};

const getDataFromApi = async (req, res)=>{
  let dataAppsUsage={
        name_app: "UBER"
    };
    try{
     
        let result = await modelo.Usagestatsappsbg.GetAppsName(dataAppsUsage.name_app);
        console.log("IMPRIME UN REGISTRO"); 
        console.log(result); 
        res.status(200).json(result);
    }catch(err){
    
        t.rolback();
        res.status(500).json(err);
 
    }
    
};


function inicializarTransaccion(){
	return new Promise((resolve, reject) => {
		sequelize.transaction(
      { autocommit: false
      }
    ).then( result => {
			return resolve(result);
		})
		.catch( fail => {
			return reject(fail);
		});
	});
};

// retorno de todas las funciones
return module.exports={
    UsageStatsBGPost,
    getDataFromApi
};
'use strict';

var moment = require('moment');
const sequelize	= require('../models').sequelize;
const modelo = require('../models');

let dataCliente;

const UsageStatsBGPost = async (req, res)=>{
   // sequelize.query('CALL GetAllClientes()',
//    let datos={
//     app_name:    req.body.razonsocial,
//     num_celular: req.body.num_celular,
//     movimientos:{
//         fecha: req.body.fecha,
//         hora: req.body.hora,
//         minutos: req.body.minutos,
//         segundos: req.body.segundo,
//         UsageAppsId: 0,
//         DeviceId: 0
//     }
//    };
let t = await inicializarTransaccion();
   try{

    let valor = req.body.datos;

    let device={
        numberphone: valor[1].numberphone,
        marca: valor[1].marca,
        modelo: valor[1].modelo
        // createdAt: Date(),
        // updatedAt: Date()
    };
    let numero=valor[1].numberphone;

    let id_device = await modelo.Device.CreateDevices(device,t);


    var count = Object.keys(valor).length;
    for(let i=1; i<=Object.keys(valor).length; i++){
        let app={
            nombre_app: valor[i].nombreapp
        };
        let id_app = await modelo.Usagestatsappsbg.CrearUsageApps(app,t);

        let movimiento={
            fecha_uso: new Date(), //moment(moment.tz('America/Guayaquil')),
            hora: valor[i].hora,
            minutos: valor[i].minutos,
            segundos:valor[i].segundos,
            UsageAppsId:id_app.get("id"),
            DeviceId:id_device.get("id")
        
        };
        console.log("MOVIMIENTOS");

     //   await modelo.Movimientosapp.CrearMovimientos(movimiento, t);
       let is_saved = await modelo.Movimientosapp.ActualizaMovimiento(movimiento, t);
        if(is_saved[0]==0){
            console.log("guarda el movimiento");
            await modelo.Movimientosapp.CrearMovimientos(movimiento, t);
        }
       
    }
    //console.log(count)
    t.commit();
        let response = {
            msj: "se guardo satisactoriamente"
        };
   // let save_movimientos = await modelo.Movimientosapps.CrearUsageApps(datos.movimientos,t);
        
     res.status(200).json(response);
}catch(err){
    console.log("error del servidor");
    console.log(err);
    t.rollback();
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
'use strict';

var moment = require('moment');
const sequelize	= require('../models').sequelize;
const modelo = require('../models');

let dataCliente;

const UsageStatsBGPost = async (req, res)=>{

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
    let battery ={
        fecha_y_hora:new Date(),
        porcentaje:parseFloat(valor[1].porcentaje_battery)*100,
        DeviceId:id_device.get("id")
    };
     await modelo.Battery_usage.CreateBatteryUsage(battery,t);

    for(let i=1; i<=Object.keys(valor).length; i++){
        let app={
            nombre_app: valor[i].nombreapp
        };
        let id_app = await modelo.Usagestatsappsbg.CrearUsageApps(app,t);

        let movimiento={
            fecha_uso: moment(moment.tz('America/Guayaquil')), //moment(moment.tz('America/Guayaquil')),
            hora: valor[i].hora,
            minutos: valor[i].minutos,
            segundos:valor[i].segundos,
            num_veces:valor[i].veces,
            UsageAppsId:id_app.get("id"),
            DeviceId:id_device.get("id")
        };
        console.log("MOVIMIENTOS");
        console.log(movimiento.fecha_uso);
     //   await modelo.Movimientosapp.CrearMovimientos(movimiento, t);
       let is_saved = await modelo.Movimientosapp.ActualizaMovimiento(movimiento, t);
        // if(is_saved[0]==0){
        //     console.log("guarda el movimiento");
        //     await modelo.Movimientosapp.CrearMovimientos(movimiento, t);
        // }
    }
  
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

function promiseSqrt(value){
    
    return new Promise(function (fulfill, reject){
        console.log('START execution with value =', value);
        let times=Math.random() * 100; 
        console.log("times");
        console.log(times);
        console.log("timeout");
        setTimeout(function() {
            fulfill({ value: value, result: value * value });
        }, 0 | times);
        console.log(Math.random() * 100);
    });
}
 
const getDataFromApi = async (req, res)=>{
  let dataAppsUsage={
        name_app: "UBER"
    };
    try{

   //     let result = await modelo.Usagestatsappsbg.GetAppsName(dataAppsUsage.name_app);
        console.log("IMPRIME UN REGISTRO");
     //   console.log(result);

    var obj = await promiseSqrt(0);
    console.log('END execution with value =', obj.value, 'and result =', obj.result);
    obj = await promiseSqrt(1);
    console.log('END execution with value =', obj.value, 'and result =', obj.result);
    obj = await promiseSqrt(2);
    console.log('END execution with value =', obj.value, 'and result =', obj.result);
    obj = await promiseSqrt(3);
    console.log('END execution with value =', obj.value, 'and result =', obj.result);
    obj = await promiseSqrt(4);
    console.log('END execution with value =', obj.value, 'and result =', obj.result);
    obj = await promiseSqrt(5);
    console.log('END execution with value =', obj.value, 'and result =', obj.result);
    obj = await promiseSqrt(6);
    console.log('END execution with value =', obj.value, 'and result =', obj.result);
    obj = await promiseSqrt(7);
    console.log('END execution with value =', obj.value, 'and result =', obj.result);
    obj = await promiseSqrt(8);
    console.log('END execution with value =', obj.value, 'and result =', obj.result);
    obj = await promiseSqrt(9);
    console.log('END execution with value =', obj.value, 'and result =', obj.result);
    obj = await promiseSqrt(10);
    console.log('END execution with value =', obj.value, 'and result =', obj.result);
 

        res.status(200).json(result);
    }catch(err){

        //t.rolback();
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
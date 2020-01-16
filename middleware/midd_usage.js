'use strict';

var modelo = require('../models');

module.exports = async (req, res,next) =>{
try {
    if(req.body.datos){
        console.log("ENTRO AL MIDDLEWARE");
        let id_device = await modelo.Device.GetDevice(req.body.datos[1].numberphone);
        console.log(id_device);
        next();
    }else{
        console.log("no hay datos para mostrar");
    }
} catch (error) {
    console.log("error");
    console.log(error);
}
    
};


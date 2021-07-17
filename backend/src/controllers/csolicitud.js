const ctrl = {};

var express = require("express");
var app = express();

// Interactuar con el modelo centro de salud
const Solicitud = require('../models/msolicitud');

//Agregar Solicitud
ctrl.solitud =  async (req, res) =>{
    console.log('Comenzamos el registro'); 

    //solicitamos los datos 
    const {rif,nombre,correo,numtlf} = req.body;
    console.log(req.body);
    
    const correoUser = await Solicitud.findOne({correo});
    if (!correoUser){
        
             // creamos el nuevo centro de salud
    const newsolicitud = new Solicitud ({rif,nombre,correo,numtlf});
 
     await newsolicitud.save();
     res.json(newsolicitud);
     console.log("Solicitud enviada");
     console.log(newsolicitud);  
        
    } else {
        res.send('El correo ya esta registrado');
         console.log('El correo ya esta registrado');
         }
};

//Listar Solicitudes
ctrl.listarSolicitudes = async (req, res) => {
    const solicitudess = await Solicitud.find();
    console.log('lista de solicitudes');
    res.json(solicitudess);   
};

//Buscar un centro de salud
ctrl.buscarsolitud = async (req, res) => {
    const solitud = await Solicitud.findById(req.params.id);
    res.json(solitud);
};


//Eliminar solitud
ctrl.eliminarsolitud = async (req, res) => {

    await Solicitud.findByIdAndRemove(req.params.id);
    res.json({status : 'solitud Eliminada'});
};

module.exports =ctrl;
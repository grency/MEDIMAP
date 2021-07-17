const serviCtrl= {};
var express = require("express");
var app = express();
const Servi= require('../models/mservicio');



//crear servicio
serviCtrl.registrarServicio = async (req, res) =>{
    try {
        console.log('Comenzamos el registro'); 

        //solicitamos los datos 
        const {idservi, especialidad} = req.body;
        console.log(req.body);
        
        // creamos el nuevo servicio
        const newservi = new Servi ({ idservi, especialidad});
     
        await newservi.save();
        console.log("servicio registrado");
        console.log(newservi);  
        res.json(newservi); 
        
    } catch (error) {
        console.log(error);
        res.status(500).send('hubo un error');
        
    } 
};

//Listar (obtener) servicios
serviCtrl.listarServicio = async (req, res) => {
    try {
        const servi = await Servi.find();
        console.log('Lista');
        res.json(servi);
    } catch (error) {
        console.log(error);
        res.status(500).send('hubo un error');
    }
};

//obtener un servicio
serviCtrl.buscarServicio = async (req, res) => {
    try {
        const servi = await Servi.findById(req.params.id);

        if (!servi) {
            res.status(404).json({ msg: 'no existe el servicio' });
        }

        res.json(servi);

    } catch (error) {
        console.log(error);
        res.status(500).send('hubo un error');
    }
  };

// editar y actualizar servicio
serviCtrl.ActualizarServicio = async (req, res) =>{
    try {
        const {id} = req.params;
        const servi = {
        especialidad: req.body.especialidad
        };
        await Servi.findByIdAndUpdate(id,{$set: servi}, {new: true});
        res.json(servi);

    } catch (error) {
        console.log(error);
        res.status(500).send('hubo un error');
    }
};

//Eliminar servicio
serviCtrl.eliminarServicio = async (req, res) =>{
    try {
        let servi=  await Servi.findById(req.params.id);
        //console.log(servi);
       if (!servi) {
        return res.status(404).send('no existe el servicio');
       }
        await Servi.findByIdAndRemove({_id: req.params.id});
        res.json({status : 'Servicio Eliminado'});
    } catch (error) {
        console.log(error);
        res.status(500).send('hubo un error');
    }
   
};



module.exports= serviCtrl;
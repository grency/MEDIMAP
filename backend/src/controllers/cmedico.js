const medicoCtrl= {};
var express = require("express");
var app = express();
const Medico= require('../models/user');

//crear Medico
medicoCtrl.registrarMedico = async (req, res) =>{
    console.log('Comenzamos el registro'); 

    //solicitamos los datos 
    const {cedula, nombre, apellido, correo, ciudad, estado, direccion, numtlf, password, idrol, especialidad} = req.body;
    console.log(req.body);
    const correoUser = await User.findOne({correo});
    if (!correoUser){
        if (password.length < 4) {
            res.send('La contraseña debe contener mínimo 4 caractares');
            console.log('La contraseña debe contener mínimo 4 caractares');
        }else {
    // creamos el nuevo medico
    const newmedico = new Medico ({cedula, nombre, apellido, correo, ciudad, estado, direccion, numtlf, password, idrol, especialidad});
 
    await newmedico.save();
    console.log("Medico registrado");
    console.log(newmedico);  
    res.json(newmedico);  
        }
    }else {
        res.send('El correo ya esta registrado');
         console.log('El correo ya esta registrado');
         }

};

//Listar Medicos(obtener)
medicoCtrl.listarMedicos = async (req, res) => {
    const medico = await Medico.find({"idrol": "Medico"});
    console.log('Lista de Medicos');
    res.json(medico);
    
};

//Buscar un medico(obtener)
medicoCtrl.buscarMedico = async (req, res) => {

    const medico = await Medico.findById(req.params.id);
    res.json(medico);
  
  };

// editar y actualizar medico
medicoCtrl.ActualizarMedico = async (req, res) =>{
    
    const {id} = req.params;
    const medico = {
            //cedula: req.body.cedula,
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            correo: req.body.correo,
            ciudad: req.body.ciudad,
            estado: req.body.estado,
            direccion: req.body.direccion,
            numtlf: req.body.numtlf,
            password: req.body.password,
            especialidad: req.body.especialidad
    };
    await Medico.findByIdAndUpdate(id,{$set: medico}, {new: true});
    res.json(medico);
};

//Eliminar medico
medicoCtrl.eliminarMedico = async (req, res) =>{
    try {
        const medico= await Medico.findById(req.params.id);

        if(!medico){
            res.status(400).json({msg: 'no existe el medico'})
        }

        await Medico.findByIdAndRemove(req.params.id);
        res.json({status : ' Medico Eliminado'});

    } catch (error) {
        console.log(error);
        res.status(500).send('hubo un error');
    }
    
};



module.exports= medicoCtrl;
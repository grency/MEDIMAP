const ctrl = {};

var express = require("express");
var app = express();

// Interactuar con el modelo centro de salud
const CentroSalud = require('../models/user');

//Agregar el centro de salud
ctrl.singUp =  async (req, res) =>{
    console.log('Comenzamos el registro'); 

    //solicitamos los datos 
    const {cedula, nombre ,apellido, correo, ciudad , estado, direccion, numtlf, password, idrol, especialidad} = req.body;
    console.log(req.body);
    
    const correoUser = await User.findOne({correo});
    if (!correoUser){
        if (password.length < 4) {
            res.send('La contraseña debe contener mínimo 4 caractares');
            console.log('La contraseña debe contener mínimo 4 caractares');
        }else {
             // creamos el nuevo centro de salud
    const newcentsalud = new CentroSalud ({cedula, nombre,apellido, correo , ciudad , estado, direccion, numtlf, password, idrol, especialidad});
 
     await newcentsalud.save();
     res.json(newcentsalud);
     console.log("centro de salud registrado");
     console.log(newcentsalud);  
        }  
    } else {
        res.send('El correo ya esta registrado');
         console.log('El correo ya esta registrado');
         }


};

//Listar centro de salud
ctrl.listarCentroSalud = async (req, res) => {
    const centroSalud = await CentroSalud.find({"idrol": "Centro de Salud"});
    console.log('lista de centro de salud');
    res.json(centroSalud);
    
};

//Buscar un centro de salud
ctrl.buscarCentroSalud = async (req, res) => {

    const centroSalud = await CentroSalud.findById(req.params.id);
    res.json(centroSalud);
  
};

//Actualizar centro de salud

ctrl.actualizarCentro = async (req, res) => {
    const { id } = req.params;
    const csal = {

        nombre : req.body.nombre,
        ciudad: req.body.ciudad,
        estado: req.body.estado,
        direccion: req.body.direccion,
        numtlf: req.body.numtlf,
        password: req.body.password
    }
    await CentroSalud.findByIdAndUpdate(id, {$set: csal}, {new: true});
    res.json({status: 'centro de salud modificado'});

};

//Eliminar centro de salud
ctrl.eliminarCentro = async (req, res) => {

    await CentroSalud.findByIdAndRemove(req.params.id);
    res.json({status : 'Centro de salud Eliminado'});
};

module.exports =ctrl;
const ctrl = {};
const passport = require('passport');

var express = require("express");
var app = express();

// Interactuar con el modelo usuario
const User = require('../models/user');


//Inicio
ctrl.validado =(req, res) => 
{ 
    res.status(200).json({status: "Usuario validado"});
    const usu = req.user;
    console.log('Usuario validado');
    console.log(usu.nombre);
    console.log(usu.apellido);
    res.redirect('/perfil');
};

ctrl.incorrecto =(req, res) => 
{ 
    return res.status(401).json({status: "Usuario invalido"});
    console.log('Usuario o Contraseña incorrecta');
};
 //Login
ctrl.iniciarSesion = passport.authenticate('local', {
        successRedirect: '/perfil/user',
        failureRedirect: '/incorrecto',
        passReqToCallback: true
        //failureFlash: true
});
//Inicio
ctrl.inicio =(req, res) => 
{ 
  res.send('Hello World.!');
  console.log('Hello World.!');
};

//Registro de usuario
ctrl.registro =  async (req, res) =>{
    console.log('Comenzamos el registro'); 

    //solicitamos los datos 
    const {cedula, nombre, apellido, correo, ciudad, estado, direccion, numtlf, password, idrol, especialidad} = req.body;
    console.log(req.body);
    const rol = req.body.idrol;
    if(rol !='Paciente')
    {
        res.send('No tienes autorizacion');
    }
    else{
        const correoUser = await User.findOne({correo});
    if (!correoUser){
        if (password.length < 4) {
            res.send('La contraseña debe contener mínimo 4 caractares');
            console.log('La contraseña debe contener mínimo 4 caractares');
        }else {
    // creamos el nuevo usuario
    const newuser = new User ({ cedula, nombre, apellido, correo, ciudad, estado, direccion, numtlf, password, idrol, especialidad});
 
    await newuser.save();
    console.log("usuario registado");
    console.log(newuser);
    res.send('USuario regitrado');
        }
    }else {
       res.send('El correo ya esta registrado');
        console.log('El correo ya esta registrado');
        }
    }

};

//Cerrar sesion
ctrl.logout = (req, res) => {
    console.log('Vamos a cerrar la sesion');
   req.logout();
   //req.user.logout();
   // req.logout();
   console.log('Sesion Cerrada');
    res.send('Sesion Cerrada');
  };


//Listar usuarios
ctrl.listarUsuarios = async (req, res) => {
    const usu = await User.find();
    console.log('lista de usuarios');
    res.json(usu);
    
};

//Buscar un usuario
ctrl.buscarUsuario = async (req, res) => {

  const usu = await User.findById(req.params.id);
  res.json(usu);

};


//Actualizar un usuario
ctrl.actualizarUsuario = async (req, res) => {
    const { id } = req.params;
    const usu = {
        nombre : req.body.nombre, 
        apellido : req.body.apellido,
        ciudad : req.body.ciudad, 
        estado : req.body.estado, 
        direccion : req.body.direccion,
        numtlf : req.body.numtlf, 
        password : req.body.password};
    await User.findByIdAndUpdate(id, {$set: usu}, {new: true});
    res.json({status: 'usuario modificado'});
    console.log('usuario editado');
};

//Eliminar un usuario
ctrl.eliminarUsuario = async (req, res) => {

    await User.findByIdAndRemove(req.params.id);
    res.json({status : 'Eliminado'});
};

module.exports =ctrl;
const ctrl = {};

var express = require("express");
var app = express();

// Interactuar con el modelo del usuario
const User = require('../models/user');

// Interactuar con el modelo del comentario
const Comment = require('../models/mcomentario');

//Mostrar perfil
ctrl.profile = async (req, res) => {
    const user = req.user;
    res.json(user);
};

//Buscar perfil
ctrl.buscaprofile = async (req, res) =>{
  
    const usua = req.params.nombre;
    console.log(usua);
    const usuario = await User.findOne({nombre: usua });
    console.log('este es el usuario que se trajo desde la base de datos');
    console.log(usuario);
    res.json(usuario);
  };

//Agregar comentario al perfil
ctrl.comentario = async (req, res) =>{
    const nombre = req.params.nombre;
    const usu = await User.findOne({nombre});
    console.log(req.params.nombre);
    console.log(usu);

    const ususession = req.user;

    if(usu){
        console.log("iniciando comentario");
        console.log(req.body);
        
        const newComment = new Comment({
            mperfil_id: nombre,
            user_id: ususession.id,
            comment: req.body.comment
        });
        newComment.nombre = usu.nombre;
        console.log(newComment);
      
        await newComment.save();
        res.json(newComment);
        console.log("comentario registrado");
        console.log(newComment);
    }
};


//Listar comentarios
ctrl.listarComentario = async (req, res) => {
    const nombre = req.params.nombre;
    const comment = await Comment.find({mperfil_id: nombre});
    console.log('lista de comentarios');
    res.json(comment);
};

//Buscar un comentario
ctrl.buscarComentario = async (req, res) => {
    const comment = await Comment.findById(req.params.id);
    res.json(comment);
};

module.exports =ctrl;
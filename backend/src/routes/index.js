const express = require("express");
const router = express.Router();
const passport = require('passport');

const User = require('../models/user');

// Importamos los controladores
const cuser = require('../controllers/cusers');
const ccentSalud = require('../controllers/cCentrosalud');
const cservi = require('../controllers/cservicio');
const cmedico = require('../controllers/cmedico');
const cperfil = require('../controllers/cperfil');
const csoli = require('../controllers/csolicitud');

//permiso 
function permiso(req, res, next){
  const usu = req.user;
  if(usu.idrol == 'Administrador'){
    return next();
  }
  res.send('No tienes autorizacion');
};

//para la autenticacion
function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()){
      return next();
  }
  res.send('Debes iniciar sesion');
};

//Validar que no haya session iniciada
function noSession(req, res, next)
{
  if (req.isAuthenticated()){
    res.send('No puedes realizar esta accion');
  }
    else{
      return next();
    }
};

//Rutas y sus controladores

module.exports = app => {
  router.get('/incorrecto', cuser.incorrecto);
  router.get('/',isAuthenticated, cuser.inicio);
  //Paciente
  router.post('/signup',noSession, cuser.registro);
  router.post('/signin',noSession, cuser.iniciarSesion);
  router.put('/:id',  isAuthenticated,cuser.actualizarUsuario);
  router.delete('/:id',isAuthenticated, cuser.eliminarUsuario);
  router.get('/:id',isAuthenticated, cuser.buscarUsuario);

  
  router.get('/listarUsuarios',isAuthenticated, cuser.listarUsuarios);

  
  //cerrar sesion
  router.get('/logout/user', isAuthenticated, cuser.logout);
   
  //Centro de Salud
   router.post('/signup/centroSalud',permiso, isAuthenticated, ccentSalud.singUp);
   router.get('/listarcentroS/centroSalud',isAuthenticated, ccentSalud.listarCentroSalud);
   router.put('/centroSalud/:id',isAuthenticated, ccentSalud.actualizarCentro);
   router.get('/centroSalud/:id',isAuthenticated, ccentSalud.buscarCentroSalud);
   router.delete('/centroSalud/:id',isAuthenticated, ccentSalud.eliminarCentro);
  
   //servicio
   router.post('/signup/servicio',permiso , isAuthenticated, cservi.registrarServicio);
   router.get('/listarServi/servicio',isAuthenticated, cservi.listarServicio);
   router.get('/obtenerServi/:id',isAuthenticated, cservi.buscarServicio);
   router.put('/updateServi/:id',isAuthenticated, cservi.ActualizarServicio);
   router.delete('/eliminarServi/:id',isAuthenticated, cservi.eliminarServicio);
   
   //medico
   router.post('/signup/medico',permiso, isAuthenticated, cmedico.registrarMedico);
   router.get('/listarMedicos/medico',isAuthenticated, cmedico.listarMedicos);
   router.put('/updateMedico/:id',isAuthenticated, cmedico.ActualizarMedico);
   router.delete('/eliminarMedico/:id',isAuthenticated, cmedico.eliminarMedico);

   //perfil comentario
   router.get('/perfil/user',isAuthenticated, cperfil.profile);
   router.get('/perfil/:nombre',isAuthenticated, cperfil.buscaprofile);
   router.post('/perfil/:nombre/comentario',isAuthenticated, cperfil.comentario);
   router.get('/listarComentario/:nombre/comentario',isAuthenticated, cperfil.listarComentario);

   //Solicitudes
   router.post('/solicitud',noSession, csoli.solitud);
   router.get('/listarSolicitudes/solicitud',isAuthenticated, permiso, csoli.listarSolicitudes);
   router.get('/buscarsolitud/:id',isAuthenticated, permiso, csoli.buscarsolitud);
   router.delete('/eliminarSolicitud/:id',isAuthenticated, permiso, csoli.eliminarsolitud);
   
  app.use(router);
};
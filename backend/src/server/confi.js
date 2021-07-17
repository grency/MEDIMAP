const express = require("express");

const routes = require('../routes/index');
const morgan = require('morgan');
const passport = require('passport');
const session = require('express-session');

require('../passport/local-auth');

module.exports = app => {
//Setting
app.set('port', process.env.PORT || 3000);
app.use(express.urlencoded({extended:false}));

//Leer archivos json
app.use(express.json());
app.use(morgan('dev'));

app.use(session({
    secret : 'secretkey',
    resave : false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) =>{
  res.locals.user = req.user || null;
  next();
});

//Routes
routes(app);
return app;
}
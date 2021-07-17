const express = require('express');

//Conexion a la base de datos
require('./database');

const confi = require('./server/confi');

const app = confi(express());

app.listen(app.get('port'), () => {
    console.log('Server on port: ', app.get('port'));
});

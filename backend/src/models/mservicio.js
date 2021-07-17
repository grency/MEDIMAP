const mongoose = require('mongoose');
const { Schema, model } = mongoose;

//const path = require('path');

const ServiSchema = new Schema({
    idservi: { type: Number, default: 1 },
    especialidad: { type: String, requiere: true}
});


module.exports = model('Servicio', ServiSchema);
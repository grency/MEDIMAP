const mongoose = require ('mongoose');
const { Schema , model} = mongoose;

const userSchema = new Schema({
    cedula: { type: String, required: true},
    nombre : { type: String, required: true},
    apellido : { type: String},
    correo: { type: String, required: true},
    ciudad : { type: String, required: true},
    estado: { type: String, required: true},
    direccion: { type: String, required: true},
    numtlf: { type: String, required: true},
    password: { type: String, required: true},
    idrol: { type: String, required: true},
    especialidad: {type: String}
});

module.exports = model('user', userSchema);
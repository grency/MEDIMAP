const mongoose = require ('mongoose');
const { Schema , model} = mongoose;

const solicitudSchema = new Schema({
    rif: { type: String, required: true},
    nombre : { type: String, required: true},
    correo: { type: String, required: true},
    numtlf: { type: String, required: true}
});

module.exports = model('solicitud', solicitudSchema);
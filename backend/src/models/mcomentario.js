const { Schema, model } = require('mongoose');
//const { model } = require('./mperfil');
const  ObjectId = Schema.ObjectId;

const CommentSchema = new Schema({
    mperfil_id: { type: String},
    user_id: { type: String},
    comment: { type: String},
    timestamp: { type: Date, default: Date.now}
});


module.exports = model('Comentario', CommentSchema);
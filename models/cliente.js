var mongoose = require('mongoose');
var unique = require('mongoose-unique-validator');

var ClienteSchema = new mongoose.Schema({
    nombre: String,
    cif: {type: String, unique: true},
    domicilio: String,
    cp: Number,
    localidad: String,
    provincia: String,
    telefono: String,
    email: String,
    contacto: String
})

ClienteSchema.plugin(unique, {message: 'El CIF introducido ya existe'});

module.exports = mongoose.model('Cliente',ClienteSchema);
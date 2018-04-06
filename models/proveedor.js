var mongoose = require('mongoose');
// Importación para realizar validaciones
var unique = require('mongoose-unique-validator');

// Esquema de propiedades de ese objeto, campos de aplicación 
// y base de datos, también los tipamos
var ProveedorSchema = new mongoose.Schema({
    nombre: String,
    // Campo que sea único
    cif: {type: String, unique: true},
    domicilio: String,
    cp: Number,
    localidad: String,
    provincia: String,
    telefono: String,
    email: String,
    contacto: String
})

// Mensaje en el caso de que el cif no se único, que la validación no se cumpla
ProveedorSchema.plugin(unique, {message: 'El CIF introducido ya existe'});

// Exportamos esto para poder utilizarlo en otro sitio
module.exports = mongoose.model('Proveedor',ProveedorSchema);
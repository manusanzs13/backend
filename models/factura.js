var mongoose = require('mongoose');
var unique = require('mongoose-unique-validator');

var FacturaSchema = new mongoose.Schema({
    nombre: String,
    cif: String,
    fecha: String,
    concepto: String,
    base: Number,
    retencion: Boolean,
    tipo: Number,
    irpf: String,
    importe: String,
    total: String
})

module.exports = mongoose.model('Factura',FacturaSchema);
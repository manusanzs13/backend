var express = require('express');
var mongoose = require('mongoose');

var Factura = require('../models/factura');

var app = express();

app.get('/',(req, res, next)=> {
    Factura.find({}).exec((err, facturas)=> {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje:'Error acceso DB',
                errores: err
            })
        }
        res.status(200).json({
            ok: true,
            facturas: facturas
        });
    });
});

app.get('/:id', function(req, res, next) {
    Factura.findById(req.params.id, (err, factura)=> {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error acceso DB',
                errores: err
            })
        }
        res.status(200).json({
            ok: true,
            factura: factura
        })
    });
});

app.post('/', (req, res)=> {
    var body = req.body;
    var factura = new Factura({
        nombre: body.nombre,
        cif: body.cif,
        fecha: body.fecha,
        concepto: body.concepto,
        base: body.base,
        retencion: body.retencion,
        tipo: body.tipo,
        irpf: body.irpf,
        importe: body.importe,
        total: body.total
    });
    factura.save((err, facturaGuardado)=> {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear el proveedor',
                errores: err
            });
        }
        res.status(200).json({
            ok: true,
            factura: facturaGuardado
        });
    });
});

app.put('/:id', function(req, res, next) {
    Factura.findByIdAndUpdate(req.params.id, req.body, function(err, datos) {
        if (err) return next(err);
        res.status(201).json({
            ok: true,
            mensaje: 'Factura actualizada'
        });
    });
});

app.delete('/:id', function(req, res, error) {
    Factura.findByIdAndRemove(req.params.id, function(err, datos) {
        if (err) return next(err);
        res.status(201).json({
            ok: true,
            mensaje: 'Factura eliminada'
        });
    });
});

module.exports = app;
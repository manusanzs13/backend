var express = require('express');
var mongoose = require('mongoose');

// Importamos el archivo de models que está exportado allí
var Proveedor = require('../models/proveedor');

var app = express();

// Método para que nos devuelva los datos de la base de datos
app.get('/',(req, res, next)=> {
    Proveedor.find({}).exec((err, proveedores)=> {
        // Si hay errores nos muestre lo siguiente
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje:'Error acceso DB',
                errores: err
            })
        }
        // Si no hay errores nos muestre los proveedores
        res.status(200).json({
            ok: true,
            proveedores: proveedores
        });
    });
}),

// Método para obetener un solo proveedor y luego poder actualizarlo en la aplicación
app.get('/:id', function(req, res, next) {
    Proveedor.findById(req.params.id, (err, proveedor)=> {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error acceso DB',
                errores: err
            })
        }
        res.status(200).json({
            ok: true,
            proveedor: proveedor
        })
    });
});

// Método post para crear en nuestra base de datos un proveedor
app.post('/', (req, res)=> {
    // Variable en la que guardar los datos que recibimos del cuerpo
    var body = req.body;
    // Variable en la que construimos un objeto con el proveedor
    // de modelos y lo que recibimos en body
    var proveedor = new Proveedor({
        nombre: body.nombre,
        cif: body.cif,
        domicilio: body.domicilio,
        cp: body.cp,
        localidad: body.localidad,
        provincia: body.provincia,
        telefono: body.telefono,
        email: body.email,
        contacto: body.contacto
    });
    // Guardar el proveedor creado o si hay error nos lo muestre
    proveedor.save((err, proveedorGuardado)=> {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear el proveedor',
                errores: err
            });
        }
        res.status(200).json({
            ok: true,
            proveedor: proveedorGuardado
        });
    });
});

// Método put, actualizar contenido
app.put('/:id', function(req, res, next) {
    // Buscar por id y actualiza
    Proveedor.findByIdAndUpdate(req.params.id, req.body, function(err, datos) {
        // Si hay error
        if (err) return next(err);
        // Si no hay error
        res.status(201).json({
            ok: true,
            mensaje: 'Proveedor actualizado'
        });
    });
});

// Método delete, borrar contenido
app.delete('/:id', function(req, res, error) {
    // Buscar por id y borrar
    Proveedor.findByIdAndRemove(req.params.id, function(err, datos) {
        if (err) return next(err);
        res.status(201).json({
            ok: true,
            mensaje: 'Proveedor eliminado'
        });
    });
});

// Exportamos el método app de arriba para utilizarlo en app.js
module.exports = app;
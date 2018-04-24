var express = require('express');
var bcryptjs = require('bcryptjs');
var jsonwebtoken = require('jsonwebtoken');

var Usuario = require('../models/usuario');

var app = express();

app.post('/', (req, res, next)=> {
    var body = req.body;
    Usuario.findOne({email: body.email}, (err, datos)=> {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error de conexión',
                errores: err
            })
        }
        if (!datos) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El correo electrónico no existe',
                errores: err
            })
        }
        if (!bcryptjs.compareSync(body.password, datos.password)) {
            return res.status(400).json({
                ok: false,
                mensaje: 'La contraseña no es correcta',
                errores: err
            })
        }
        // Controlar el login y cifrarlo (datos cifrados, contraseña, tiempo)
        var token = jsonwebtoken.sign({usuario:datos},'asñdlgaeiugh');
        // Respuesta
        res.status(200).json({
            ok: true,
            token: token,
            nombre: datos.nombre,
            rol: datos.rol
        })
    })
})

module.exports = app;
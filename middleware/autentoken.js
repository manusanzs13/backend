// Comprobbar que el token que va en los mensajes es correcto,
// es el que se ha utilizado en la autenticacion
var jsonwebtoken = require('jsonwebtoken');

exports.verificarToken = function(req, res, next) {
    var token = req.query.token;
    // Coge el token, la clave de login al crear token y función con decoded que desencripta el usuario
    jsonwebtoken.verify(token, 'asñdlgaeiugh', (err, decoded)=> {
        if(err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Token incorrecto',
                errores: err
            })
        }
        req.usuario = decoded.usuario;
        next();
    })
}
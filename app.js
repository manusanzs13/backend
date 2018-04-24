var express = require('express');
var bodyParser = require('body-parser');

var proveedor = require('./routes/proveedor');
var factura = require('./routes/factura');
var usuario = require('./routes/usuario');
var login = require('./routes/login');
var cliente = require('./routes/cliente');

var app = express();

var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

// Método para conectar con la base de datos
// url mas nombre de la base de datos
// objeto relacionado con bluebird (siempre así)
mongoose.connect('mongodb://localhost:27017/erp', {promiseLibrary: require('bluebird')})
    // Si funciona bien
    .then(()=> {
        console.log('Conectado a la DB');
    })
    // Si funciona mal
    .catch((err)=> {
        console.error(err);
    })

// Corregir los errores de cabecera cuando exportemos la base de datos a una página
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods","GET, POST, PUT, DELETE, OPTIONS");
    next();
});

app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({'extended': false}));

// Enrutar a proveedor para que nos haga los métodos
app.use('/proveedor', proveedor);
app.use('/factura', factura);
app.use('/usuario', usuario);
app.use('/login', login);
app.use('/cliente', cliente);

app.listen(3000, function() {
    console.log('Servidor OK en el puerto 3000');
});
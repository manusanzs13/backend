var express = require('express');
var bodyParser = require('body-parser');

var proveedor = require('./routes/proveedor');

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

app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({'extended': false}));

// Enrutar a proveedor para que nos haga los métodos
app.use('/proveedor', proveedor);

app.listen(3000, function() {
    console.log('Servidor OK en el puerto 3000');
});
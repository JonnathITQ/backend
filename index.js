//Usamos para que sea más robusto y seguro esta parte del code
'use strict'
//Variables para almacenar la libería de mongoose y el puerto
var mongoose = require('mongoose');
var port = 3600;
//Promesas Nativas de de JavaScript
mongoose.promise = global.Promise;
//Importación de express a la app
var app = require('./app');
//Conexión con la BDD
mongoose.connect('mongodb://localhost:27017/CCI') //url de la bdd
    .then(() => {
        console.log('Conexión encontrada'); //Conexión encontrada
        app.listen(port, () => { //Inicio del servidor en el puerto seleccionado anteriormente
            console.log("Conexión con la Base de Datos realizada con éxito, crack") //Conexión con la base de datos exitosa
        })
    })
    .catch(err => console.log(err)); //Error en la conexión con la base de datos
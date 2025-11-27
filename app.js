//Usamos para que sea más robusto y seguro esta parte del code
'use strict'
//Creamos variables para almacenar express y body parser
var express = require('express');
var bodyParser = require('body-parser');
//Variable para instanciar express y redirigir las rutas
var app = express();
var CCI_routes = require('./routes/cci');
//Usaremos el body parser para que todo lo que llegue o se envíe, se transforme a JSON
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const cors = require('cors');
app.use(cors());
//Configuración de Cabeceras
app.use((req, res, next) => {
    //Access-Control-Allow-Origin: especifica el origen que está permitido acceder a la API
    // el * significa que cualquier origen está permitido acceder a la API
    res.header('Access-Control-Allow-Origin', '*');
    //Access-Control-Allow-Headers: especifica los headers que se pueden usar en la solicitud
    //Authorization: contiene las credenciales de autenticación del usuario
    //X-API-KEY: contiene la llave de la API
    //Origin: contiene la URL de la solicitud
    //X-Requested-With: contiene la información sobre la solicitud
    //Content-Type: contiene el tipo de contenido de la solicitud
    //Accept: contiene el tipo de contenido que el cliente puede aceptar
    //Access-Control-Allow-Request-Method: contiene los métodos HTTP que se pueden usar en la solicitud
    res.header('Access-Control-Allow-Headers'
        , 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    //Access-Control-Allow-Methods: especifica los métodos HTTP que se pueden usar en la solicitud
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    //Allow: especifica los métodos HTTP que están permitidos en la solicitud
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    //next(): permite que la solicitud continúe su flujo normal
    next();
});
app.use('/', CCI_routes);  //Ruta base para acceder a las rutas definidas en CCI_routes
module.exports = app; //Exportamos la app para que pueda ser usada en otras partes del código

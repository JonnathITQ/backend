'use strict'
var mongoose = require('mongoose'); //Importación de mongoose para la conexión con la base de datos
var Schema = mongoose.Schema; //Importación de Schema para definir la estructura de los datos

var TiendaSchema = Schema({
    nombre: String,
    descripcion: String,
    local: Number,
    ubicacion: String,
    imagen: String
});
//Exportamos el modelo para que pueda ser usada en otras partes del código
module.exports = mongoose.model('Tiendas', TiendaSchema);
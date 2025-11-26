'use strict'
//creamos variables para express y redirección al controlador
var express = require('express');
const cciController = require('../controller/cci');
//Define rutas específicas dentro de la applicación
var router = express.Router();
//Subida de archivos multiparty/form-data
var multipart = require('connect-multiparty');
var multiPartMiddleware = multipart({ uploadDir: './uploads' });

//Página principal
router.get('/home', cciController.home);
//Guardar información de la tienda
router.post('/guardar-tienda', cciController.saveTienda);
//Ver información de las tiendas
router.get('/tienda', cciController.getTiendas);
//Obtener datos de una tienda en específico
router.get('/tienda/:id', cciController.getTienda);
//Eliminar una tienda
router.delete('/tienda/:id', cciController.deleteTienda);
//Actualizar tienda
router.put('/tienda/:id', cciController.updateTienda);
//Mostrar Usuarios
router.get('/usuario', cciController.getUsuario);
//Mostrar Empleados
router.get('/empleado', cciController.getEmpleado);
//Agregar Imagenes
router.post('/subir-imagen/:id', multiPartMiddleware, cciController.uploadImagen);
//Mostrar Imagenes
router.get('/subir-imagen/:imagen', cciController.getImagen);

//Hacemos visible para los demás componentes
module.exports = router;
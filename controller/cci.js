/*
Este fragmento de código fue escrito a las 4 o 5 de la tarde, no estoy seguro... Bajo efectos de la anestesia por mi extracción
de médula combinados con cafeína, desesperación y un bug que solo se mostraba cuando nadie veía

No funciona si lo entiendes
No lo entiendes si funciona

Cualquier intento que mis compañeros hagan para refactorizar, solo resultará en la invocación de problemas dimensionales, loops infinitos
y un extraño parpadero en el monitor que aún no puedo explicar

Si necesitan cambiar esto, primero rezar, luego hacer una copia de seguridad, y por último... suerte!
*/

'use strict'
//Instanciamos las rutas de los modelos
const Tienda = require('../models/tiendas');
const Usuario = require('../models/usuarios');
const Empleado = require('../models/empleados');
//variable del path
var path = require('path');
//variable del fs
var fs = require('fs');
//variable Controlador
var controller = {

    //Ruta para acceder a la página principal
    home: function (req, res) {
        return res.status(200).send( //Retorna un mensaje de bienvenida
            "<h1>Hola, soy Alejandro</h1>"
        );
    },

    //Funcion para poder guardar una tienda en la base de datos
    saveTienda: function (req, res) {
        var tienda = new Tienda(); //Creamos una nueva instancia de la tienda
        var params = req.body; //Obtenemos los parámetros de toda la tienda

        tienda.nombre = params.nombre;
        tienda.descripcion = params.descripcion;
        tienda.local = params.local;
        tienda.ubicacion = params.ubicacion;

        tienda.save()
            .then(tiendaInformacion => {
                if (!tiendaInformacion) return res.status(400).send({ message: 'No se ha guardado la tienda' });
                return res.status(200).send({ tienda: tiendaInformacion });
            })
            .catch(err => {
                return res.status(500).send({ message: 'Error al guardar la tienda ', error: err });
            });
    },

    getTiendas: function (req, res) {
        Tienda.find({}).sort().exec()
            .then(tiendas => {
                if (!tiendas || tiendas.length === 0)
                    return res.status(404).send({ message: 'No hay ningún producto' });
                return res.status(200).send({ tiendas });
            })
            .catch(err => {
                return res.status(500).send({ message: 'Error al recuperar los datos', error: err });
            });
    },

    getTienda: function (req, res) {
        var tiendaId = req.params.id;

        Tienda.findById(tiendaId)
            .then(tienda => {
                if (!tienda) return res.status(404).send({ message: 'Tienda no encontrada' });
                return res.status(200).send({ tienda });
            })
            .catch(err => {
                if (err.name === 'CastError') {
                    return res.status(404).send({ message: 'Formato de ID no válido' });
                }
                return res.status(500).send({ message: 'Error al recuperar los datos', error: err });
            });
    },

    deleteTienda: function (req, res) {
        var tiendaId = req.params.id;
        Tienda.findByIdAndDelete(tiendaId)
            .then(tiendaEliminada => {
                if (!tiendaEliminada)
                    return res.status(404).send({ message: 'El producto no existe, no se puede eliminar' });
                return res.status(200).send({ tienda: tiendaEliminada, message: 'Pudo ser eliminado correctamente' });
            })
            .catch(err => {
                if (err.name === 'CastError') {
                    return res.status(404).send({ message: 'Formato de ID no válido' });
                }
                return res.status(500).send({ message: 'Error al recuperar los datos', error: err });
            });
    },

    updateTienda: function (req, res) {
        var tiendaId = req.params.id;
        var update = req.body;

        Tienda.findByIdAndUpdate(tiendaId, update, { new: true })
            .then(tiendaUpdate => {
                if (!tiendaUpdate) return res.status(404).send({ message: 'La tienda no existe para actualizar' });
                return res.status(200).send({ tienda: tiendaUpdate });
            })
            .catch(err => {
                if (err.name === 'CastError') {
                    return res.status(404).send({ message: 'Formato de ID no válido' });
                }
                return res.status(500).send({ message: 'Error al recuperar los datos', error: err });
            });
    },

    getUsuario: function (req, res) {
        Usuario.find().sort().exec()
            .then(usuarios => {
                if (!usuarios || usuarios.length === 0)
                    return res.status(404).send({ message: 'No se han encontrado usuarios registrados' });
                return res.status(200).send({ usuarios })
            })
            .catch(err => {
                return res.status(500).send({ message: 'Error al recuperar los datos', error: err });
            });
    },

    getEmpleado: function (req, res) {
        Empleado.find().sort().exec()
            .then(empleados => {
                if (!empleados || empleados === 0)
                    return res.status(404).send({ message: 'No se han encontrado empleados registrados' })
                return res.status(200).send({ empleados });
            });
    },

    uploadImagen: function (req, res) {
        var tiendaId = req.params.id;
        var fileName = 'Imagen no subida... SAPO'

        if (req.files) {
            var filePath = req.files.imagen.path;
            var file_split = filePath.split('\\');
            var fileName = file_split[file_split.length - 1];

            var extSplit = fileName.split('\.');
            var fileExt = extSplit[extSplit.length - 1];

            if (fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpeg' || fileExt == 'gif') {
                Tienda.findByIdAndUpdate(tiendaId, { imagen: fileName }, { new: true })
                    .then(tiendaActualizar => {
                        if (!tiendaActualizar) {
                            fs.unlink(filePath, (unlinkErr) => {
                                return res.status(404).send({ message: 'El producto no existe y no se subió la imagen' });
                            });
                        } else {
                            return res.status(200).send({ tienda: tiendaActualizar });
                        }
                    })

                    .catch(err => {
                        fs.unlink(filePath, (unlinkErr) => {
                            if (unlinkErr) console.error('Error al eliminar el archivo temporal', unlinkErr);
                            if (err.name === 'CastError') {
                                return res.status(404).send({ message: 'Formato de ID no válido para subir la imagen' });
                            }
                            return res.status(500).send({ message: 'Error al subir la imagen o actualizar el producto', error: err });
                        })
                    })
            } else {
                return res.status(400).send({ message: 'No se ha subido ninguna imagen' });
            }
        }
    },

    getImagen: function (req, res) {
        var file = req.params.imagen;
        var path_file = './uploads/' + file;
        var absolutePath = path.resolve(path_file);

        fs.access(absolutePath, fs.constants.F_OK, (err) => {
            if (!err) {
                return res.sendFile(absolutePath);
            } else {
                return res.status(404).send({ message: 'No existe la imagen' });
            }
        });
    }
}

module.exports = controller;

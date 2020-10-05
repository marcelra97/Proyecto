// Nada mas encender la aplicacion las rutas ya estan activadas
console.log("Las rutas estan cargadas");

const express = require('express');
const router = express.Router();

const Usuarios = require('../controllers/usuarios.controllers.js'); // con esto estoy exportando el fichero controllers en las rutas.

//cuando soliciten esta ruta se activara la funcion
router.post('/usuarios/isValidUser', Usuarios.isValidUser);

module.exports = router;
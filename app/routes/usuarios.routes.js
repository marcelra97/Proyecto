const express = require('express');
const router = express.Router();

const Usuarios = require('../controllers/usuarios.controllers');

router.post('/usuarios/isValidUser', Usuarios.isValidUser);

module.exports = router;
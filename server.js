const express = require('express');
const path = require('path');
const app = express();

//conexion a la base de datos
const mysql = require('mysql');
const config = require('./db/config.js');

//Rutas
app.use("/api", require('./app/routes/usuarios.routes.js'));

// Paginas publicas (estaticas)
app.use(express.static(path.join(__dirname, 'public')));


 // Escuchemos en un puerto
app.listen(3000, () => {
    console.log(" * [ GameJob ] A toda maquina!!! en http://localhost:3000");
 });
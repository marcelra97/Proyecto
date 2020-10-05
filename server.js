const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

//conexion a la base de datos
const mysql = require('mysql');
//const config = require('./db/config.js');


// Utilizaremos body-parser para "parsear lo que nos pidan"
app.use(bodyParser.urlencoded({
    extended: true
}));

//Parsearemos los jsones
app.use(bodyParser.json());

//Rutas
app.use("/api", require('./app/routes/usuarios.routes.js')); // con esto estoy exportando las rutas que tengo configuradas en el fichero routes, en el servidor

// Paginas publicas (estaticas)
app.use(express.static(path.join(__dirname, 'public')));


 // Escuchemos en un puerto
app.listen(3000, () => {
    console.log(" * [ GameJob ] A toda maquina!!! en http://localhost:3000");
 });
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const passport = require('passport');

//conexion a la base de datos
const mysql = require('mysql');

const app = express();

app.set('port', process.env.PORT || 3000);



//Indicamos donde esta la carpeta views 
app.set('views', path.join(__dirname, 'views'));

app.engine('hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'),'layouts'),
    extname: '.hbs'
}))
app.set('view engine', 'hbs');


//passport
app.use(passport.initialize());
app.use(passport.session());


// Utilizaremos body-parser para "parsear lo que nos pidan"
app.use(bodyParser.urlencoded({
    extended: true
}));

//Parsearemos los jsones
app.use(bodyParser.json());

//Rutas
app.use("/api", require('./routes/usuarios.routes.js')); // con esto estoy exportando las rutas que tengo configuradas en el fichero routes, en el servidor
app.use(require('./routes'))
// Paginas publicas (estaticas)
app.use(express.static(path.join(__dirname, '/public')));


 // Escuchemos en un puerto
app.listen(app.get('port'), () => {
    console.log(" * [ GameJob ] A toda maquina!!! en http://localhost:3000");
 });
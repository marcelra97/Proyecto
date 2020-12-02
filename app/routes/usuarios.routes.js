// Nada mas encender la aplicacion las rutas ya estan activadas
console.log("Las rutas estan cargadas");

const express = require('express');
const router = express.Router();
const passport = require('passport')


const Usuarios = require('../controllers/usuarios.controllers.js'); // con esto estoy exportando el fichero controllers en las rutas.
const Model = require('../model/gamejob.model');

//cuando soliciten esta ruta se activara la funcion
router.post('/usuarios/isValidUser', function(req,res,next){
    passport.authenticate('local-login', (error,user,info)=>{
        console.log(user);
    })(req,res,next);
});



router.get('/usuarios/profile', function(req, res){
    res.render('user/userProfile',{
        styleUsuario: '/css/profile.css',
        usuariosjs: '/js/user.js'
    })
});


router.post('/usuarios/findUserById/:id', Usuarios.findUserById);
module.exports = router;
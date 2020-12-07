// Nada mas encender la aplicacion las rutas ya estan activadas
console.log("Las rutas estan cargadas");

const express = require('express');
const router = express.Router();
const passport = require('passport')


const Usuarios = require('../controllers/usuarios.controllers.js'); // con esto estoy exportando el fichero controllers en las rutas.
const Model = require('../model/gamejob.model');

const optsCookie = {
    expires: new Date(Date.now() + 36000000),
    secure: false,
    httpOnly: false
}

//cuando soliciten esta ruta se activara la funcion
router.post('/usuarios/logIn', (req, res,next) =>{

    passport.authenticate('local-login', {session: false}, (error,user,info) => {

        if (error || !user) {
            return res.status(400).send(info);

        }
            
        req.logIn(user, error =>{
            const token = Model.createWeBToken({
                id: user.id,
            });
            res.cookie("jwt", token, optsCookie);
            info.cookies = optsCookie;
            info.user = user;
            res.status(200).send(info);
        })
    })(req,res,next);
});



router.get('/usuarios/profile', passport.authenticate('jwt', {session:false}), (req, res) => {
    
    res.render('user/userProfile',{
        styleUsuario: '/css/profile.css',
        usuariosjs: '/js/user.js'
    });

})


router.get('/usuarios/findUserById/:id', Usuarios.findUserById);
module.exports = router;
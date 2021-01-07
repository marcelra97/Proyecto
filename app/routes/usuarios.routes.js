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

router.get('/usuarios/logOut', (req, res) =>{
    res.clearCookie("jwt");
    return res.status(200).redirect('/');
});


router.get('/usuarios/profile/:tipo', passport.authenticate('jwt', {session:false}), (req, res) => {
    
    if(req.params.tipo == "jugador"){
       
        res.render('user/userProfileJugador',{
            styleUsuario: '/css/profile.css',
            usuariosjs: '/js/user.js'
        });
    }
    
    if(req.params.tipo == "equipo"){
        res.render('user/userProfileEquipo',{
            styleUsuario: '/css/profile.css',
            usuariosjs: '/js/user.js'
        });
    }

})

router.post('/usuarios/createNewUser', Usuarios.newUser);
router.get('/usuarios/profile/findUserById/:id', Usuarios.findUserById);
router.post('/usuarios/existeNickname', Usuarios.existeNickname);
router.post('/usuarios/existeEmail', Usuarios.existeEmail);

router.get('/usuarios/configuracion', passport.authenticate('jwt', {session:false}), (req, res) =>{
    
    res.render('user/configuracionPerfil',{
        styleConfiguration:'/css/configuracionStyle.css',
        configurationjs:'/js/configuracion.js'
    });
});

router.get('/usuarios/configuracion/findUserById/:id', Usuarios.findUserById)
router.post('/usuarios/configuracion/updateNombreJugador', Usuarios.updateNombreJugador);
router.post('/usuarios/configuracion/updateApellidos', Usuarios.updateApellidos);
router.post('/usuarios/configuracion/updateFechaNacimiento', Usuarios.updateFechaNacimiento);
router.post('/usuarios/configuracion/updateDNI', Usuarios.updateDni);
router.post('/usuarios/configuracion/updateNombreEquipo', Usuarios.updateNombreEquipo);
router.post('/usuarios/configuracion/updateCreacionEquipo', Usuarios.updateFechaCreacion);
router.post('/usuarios/configuracion/updateDireccion', Usuarios.updateDireccion);
router.post('/usuarios/configuracion/updateEmail', Usuarios.updateEmail);
module.exports = router;
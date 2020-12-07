const passport = require('passport');
const LocalSrategy = require('passport-local');
const JwtStrategy = require('passport-jwt').Strategy;

const Usuarios = require('../controllers/usuarios.controllers');
const Model = require('../model/gamejob.model')

passport.use('local-login', new LocalSrategy({
    usernameField: 'nickname',
    passwordField: 'password'
}, async ( nickname, password, done) => {
    // const user = await Usuarios.findByNickname(nickname);
    // done(null, user);
    
    try {
        const user = await Usuarios.findByNickname(nickname);
        const comprobacion = await Model.isCorrectPassword(password, user.password);
        
        if (!user) {        
            return done(null, false, { succes: false, message: `El usuario ${nickname} no existe.` })
        }
        
        if (!comprobacion) {   
                 
            return done(null, false, { succes: false, message: `Las contraseña no es correcta.` })         
        }
        done(null, { id: user.id }, { succes: true, message: 'El usuario ha sido logeado correctamente.' })
    }
    catch(error) {
         done(error, false, { succes: false, message: 'Problemas internos.' })
    }
}));    

const opts = {
    jwtFromRequest: (req) => req.cookies.jwt,
    secretOrKey: 'dawdiw'
};

passport.use('jwt',new JwtStrategy(opts, async (payload, done) => {
    const user = await Usuarios.findByIdByPassport(payload.id);
    done(null, user)

}));
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports.getConnection = async function(){
    const mysql = require('mysql2/promise');

    let config ={
      host     : 'localhost',
      user     : 'marcel',
      password : 'marcel97',
      database : 'gamejob'
    };
    
    return await mysql.createConnection(config);
    
};

//Esto es el encriptado de la password de cada uno de los usuarios
module.exports.getEnCrypted = async function(str){

  const saltRounds = await bcrypt.genSaltSync(13);

  return await bcrypt.hashSync(str, saltRounds);

}

module.exports.isCorrectPassword = async function(myPlaintextPassword, hash){

  return await bcrypt.compareSync(myPlaintextPassword, hash);

}

module.exports.createWeBToken = (id) => {

  return jwt.sign( id, 'dawdiw', {
      expiresIn: 60 * 60 * 24
  });
  
}

module.exports.verifyToken = (token) => {
  
  jwt.verify(token, 'dawdiw', function(err, decoded) {
    return (decoded);
  });

}
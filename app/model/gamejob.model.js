module.exports.getConnection = function(){
    const mysql = require('mysql');

    let config ={
      host     : 'localhost',
      user     : 'marcel',
      password : 'marcel97',
      database : 'gamejob'
    };
    
    return mysql.createConnection(config);
    
};

//Esto es el encriptado de la password de cada uno de los usuarios
module.exports.getEnCrypted = async function(str){

  const bcrypt = require('bcrypt');

  const saltRounds = await bcrypt.genSaltSync(13);

  return await bcrypt.hashSync(str, saltRounds);

}

module.exports.isCorrectPassword = async function(myPlaintextPassword, hash){

  const bcrypt = require('bcrypt');
  
  return await bcrypt.compareSync(myPlaintextPassword, hash);

}

module.exports.createWeBToken = (id) => {

  const jwt = require('jsonwebtoken');

  return jwt.sign( id, 'dawdiw', {
      expiresIn: 60 * 60 * 24
  });
  
}
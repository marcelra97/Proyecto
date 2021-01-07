const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports.getConnection = async function(){
    const mysql = require('mysql2/promise');

    let config ={
      host     : 'eu-cdbr-west-03.cleardb.net',
      user     : 'bc47777469fe2e',
      password : '277f1b8e',
      database : 'heroku_2f913fda8cad698'
    };
    
    return await mysql.createConnection(config);
    
};

//Esto es el encriptado de la password de cada uno de los usuarios
module.exports.getEnCrypted = function(password){
  
  const saltRounds =  bcrypt.genSaltSync(13);

  return  bcrypt.hashSync(password, saltRounds);

}

module.exports.isCorrectPassword = function(myPlaintextPassword, hash){
  
  return  bcrypt.compareSync(myPlaintextPassword, hash);

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

/*host     : 'eu-cdbr-west-03.cleardb.net',
user     : 'bc47777469fe2e',
password : '277f1b8e',
database : 'heroku_2f913fda8cad698'*/

/*host     : 'localhost',
      user     : 'marcel',
      password : 'marcel97',
      database : 'gamejob'*/
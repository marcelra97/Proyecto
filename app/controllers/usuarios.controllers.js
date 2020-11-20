const model = require("../model/gamejob.model.js"); // con esto estoy haciendo conexion con la base de datos mediante lo que tengo configurado en el modelo


// Exporto la funcion validUser para poder utilizarla fuera de la funcion
exports.isValidUser = async (req, res) => {

    const connection = await model.getConnection();
   
    
    connection.connect(async err => {
  
         if(!err){

            //console.log( await model.getEnCrypted("1234"));

             console.log(" Base de datos conectada");
              let sql =  `SELECT * FROM usuarios WHERE nickname = '${req.body.user}' `;
    
              connection.query(sql, async (error, results, fields) => {
                
                  if (error) {

                    return console.error(error.message);

                  }
                  
                  if(results.length){

                    let isCorrect = await model.isCorrectPassword(req.body.password, results[0].password);
                      
                      //Aqui entra cuando la password de ese usuario esta correcto y le devuelvo datos de la BD para poder cargar su perfil
                    if(isCorrect){
                        
                        //crea el token de la web para la sesion del usuario
                        let webToken = model.createWeBToken({id:results[0].id});

                        const usuario = parseUser(results);
                        usuario.token = webToken;
                        
                        res.send(usuario);
                        

                    }else{
                      res.send({msg: "Usuario no valido" })
                    }
                    

                  }else{

                    res.send({msg: "Usuario no valido" })

                  }

                  
                });
              
                connection.end(); 
         }
         else{
             console.log("ha fallado");
         }
    });
}

//Para cargar el perfil del usuario
exports.findUserById = async (req, res) =>{

  const connection = await model.getConnection();

  connection.connect(async err => {
    
    if(!err){
      
    let sql = `SELECT * FROM usuarios WHERE id = '${req.body.id}'`;

    connection.query(sql, async (error, results, fields) => {

      if (error) {
       
        return console.error(error.message);

      }
      
      if(results.length){
        
       
        usuario = {
                            
          id: results[0].id,
          nombre: results[0].nombre,
          apellidos: results[0].apellidos,
          fecha_nacimiento: results[0].fecha_nacimiento,
          dni: results[0].dni,
          direccion: results[0].direccion,
          email: results[0].email,
        }

        res.send(usuario);
      }

    });

    connection.end();
  
    }else{
      console.log("Algo ha fallado");
    }
  
  });
  

}

exports.isValidToken = async (req, res) => {
  console.log({token:req.body.token});

  const isValid = model.verifyToken(req.body.token);

  res.send({token:isValid});
  
}

const parseUser = (results) => {

  return{
    
    id: results[0].id,
    nickname: results[0].nickname,
    nombre: results[0].nombre,
    apellidos: results[0].apellidos,
    fecha_nacimiento: results[0].fecha_nacimiento,
    dni: results[0].dni,
    direccion: results[0].direccion,
    email: results[0].email,
    validado: true
  }

}

let usuario;
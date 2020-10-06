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
                        
                        let usuarios = {
                            
                            id: results[0].id,
                            nombre: results[0].nombre,
                            apellidos: results[0].apellidos,
                            

                        }
                        
                       
                     }

                    res.send(results);

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
    

   
    //res.send(user);

}
const model = require("../model/gamejob.model.js"); // con esto estoy haciendo conexion con la base de datos mediante lo que tengo configurado en el modelo


// Exporto la funcion validUser para poder utilizarla fuera de la funcion
exports.isValidUser = async (req, res) => {
  
    const connection = await model.getConnection();
   
    
    connection.connect(async err => {
  
         if(!err){
          
             console.log(" Base de datos conectada");
              let sql =  `SELECT * FROM usuarios`;
    
              connection.query(sql, (error, results, fields) => {
                 
                  if (error) {

                    return console.error(error.message);

                  }
                 
                  res.send(results);

                });
              
                connection.end(); 
         }
         else{
             console.log("ha fallado");
         }
    });
    
    console.log(req.body);
    const user = req.body;
    console.log(user);
    res.send(user);

}
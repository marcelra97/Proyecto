const connection = require("../model/gamejob.model.js").getConnection();

exports.isValidUser = (req, res) => {
    
    console.log(req);
    
    connection.connect((err) =>{
  
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

}
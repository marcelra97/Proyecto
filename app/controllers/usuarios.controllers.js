const model = require("../model/gamejob.model.js"); // con esto estoy haciendo conexion con la base de datos mediante lo que tengo configurado en el modelo

// User by NickName, esto es para el passport
exports.findByNickname= async (nickname) => {

  const connection = await model.getConnection();
  
  const [rows] = await connection.execute('SELECT * FROM `usuarios` WHERE `nickname` = ?',[nickname]);
  
  if(rows.length){

    const user = parseUser(rows)
    return user;
  }
  return null;
  
}


//Para cargar el perfil del usuario
exports.findUserById = async (req, res) =>{

  const connection = await model.getConnection();
  console.log(req.params);
  const [rows] = await connection.execute('SELECT * FROM `usuarios` WHERE `id` = ?',[req.params.id]);
  
  if(rows.length){
    
    const user = parseUser(rows)
    res.send(user);
  }
  return null;

}


//ID de passport
exports.findByIdByPassport = async(id) => {

  const connection = await model.getConnection();

  const [rows] = await connection.execute('SELECT * FROM `usuarios` WHERE `id` = ?',[id]);
  
  if(rows.length){

    const user = parseUser(rows)
    return user;
  }
  return null

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

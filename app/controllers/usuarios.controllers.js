const model = require("../model/gamejob.model.js"); // con esto estoy haciendo conexion con la base de datos mediante lo que tengo configurado en el modelo

exports.newUser = async (req, res) =>{

  const connection = await model.getConnection();

  const password = model.getEnCrypted(req.body.pws);

  const sql = 'INSERT INTO usuarios (id, nickname, direccion, email, password, tipo_usuario) ' +
        'VALUES (null,"' + req.body.nick + '","' + req.body.drc + '","' + req.body.email + '","' + password + '","' + req.body.tipo + '")';

  const  [rows] = await connection.execute(sql);
 
    //const sql2 = 'SELECT id FROM usuarios WHERE'
  if(req.body.tipo == "equipo"){
    
    const sqlEquipo = 'INSERT INTO equipo (nombre_equipo, id_usuarios) VALUES ("'+ req.body.equipo + '","'+ rows.insertId +'")';
    
    const [rowsEquipo] = await connection.execute(sqlEquipo);
    
    if ([rows].length && [rowsEquipo].length){
      
      res.send(true);
        
    } 
    
  }

  if(req.body.tipo == "jugador"){
   
    const sqlJugador = 'INSERT INTO jugador (nombre, apellidos, fecha_nacimiento, dni, id_usuarios) ' +
        'VALUES ("' + req.body.nombre + '","' + req.body.apellidos + '","' + req.body.ncm + '","' + req.body.nif + '","'+ rows.insertId +'")';

    const [rowsJugador] = await connection.execute(sqlJugador);

    if ([rows].length && [rowsJugador].length){   
      console.log(rows.insertId);
        const verificacion = true;
        const resNewUser = parsenewUser(rows.insertId, verificacion);

        res.send(resNewUser);
    }
    
  }

}


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
    password: results[0].password
  }

}

const  parsenewUser = (id, verificacion) =>{
  return {
    id: id,
    validacion: verificacion
  }
}
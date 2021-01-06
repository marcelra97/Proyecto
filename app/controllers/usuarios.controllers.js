const model = require("../model/gamejob.model.js"); // con esto estoy haciendo conexion con la base de datos mediante lo que tengo configurado en el modelo

exports.updateNombreJugador = async(req, res) =>{
  const connection = await model.getConnection();
  const sql = 'UPDATE jugador SET nombre = "'+ req.body.dato +'" WHERE id_usuarios = "'+ req.body.id + '";'
  const [rows] = await connection.execute(sql);
  
  if(rows.affectedRows > 0){
    res.send(true);
  }else{
    res.send(false);
  }
  
}

exports.existeEmail = async(req, res) =>{
  const connection = await model.getConnection();

  const [rows] = await connection.execute('SELECT * FROM `usuarios` WHERE `email` = ?',[req.body.email]);

  if(rows.length != 0){
    res.send({msg:true});
    
  }else{

    res.send({msg:false});
  }

}

exports.existeNickname = async(req, res) =>{

  const connection = await model.getConnection();

  const [rows] = await connection.execute('SELECT * FROM `usuarios` WHERE `nickname` = ?',[req.body.nickname]);

  if(rows.length != 0){
    res.send({msg:true});

  }else{

    res.send({msg:false});
  }

}


exports.newUser = async (req, res) =>{

  const connection = await model.getConnection();

  const password = model.getEnCrypted(req.body.pws);

  const sql = 'INSERT INTO usuarios (id, nickname, direccion, email, password, tipo_usuario) ' +
        'VALUES (null,"' + req.body.nick + '","' + req.body.drc + '","' + req.body.email + '","' + password + '","' + req.body.tipo + '")';

  const  [rows] = await connection.execute(sql);
 
  if(req.body.tipo == "equipo"){
    
    const sqlEquipo = 'INSERT INTO equipo (nombre_equipo, fecha_creacion, id_usuarios) VALUES ("'+ req.body.equipo + '","'+ req.body.crnEquipo +'","'+ rows.insertId +'")';
    
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
 
  if(rows.length != 0 ){

     const tipo = rows[0].tipo_usuario;
     const [rows2] = await connection.execute("SELECT * FROM usuarios INNER JOIN "+ tipo +" ON usuarios.id = "+ tipo +".id_usuarios WHERE usuarios.id = "+ rows[0].id +"");

    if(rows2[0].tipo_usuario == "equipo"){
      
      const equipo = parseEquipo(rows2);
      return equipo;
    }

    if(rows2[0].tipo_usuario == "jugador"){
      const user = parseUser(rows2)
      return user;
    }

  }else{

    return false;
  }
  
}

//ID de passport
exports.findByIdByPassport = async(id) => {
  
  const connection = await model.getConnection();

  const [rows] = await connection.execute('SELECT * FROM `usuarios` WHERE `id` = ?',[id]);
  const tipo = rows[0].tipo_usuario;

  const [rows2] = await connection.execute("SELECT * FROM usuarios INNER JOIN "+ tipo +" ON usuarios.id = "+ tipo +".id_usuarios WHERE usuarios.id = "+ rows[0].id +"");

  if(rows2.length){

    if(rows2[0].tipo_usuario == "equipo"){

      const equipo = parseEquipo(rows2);
      return equipo;

    }
    if (rows2[0].tipo_usuario == "jugador") {

      const user = parseUser(rows2)
      return user;

    }
    
  }
  return null

}

//Para cargar el perfil del usuario
exports.findUserById = async (req, res) =>{
  
  const connection = await model.getConnection();
  
  const [rows] = await connection.execute('SELECT * FROM `usuarios` WHERE `id` = ?',[req.params.id]);
  const tipo = rows[0].tipo_usuario;

  const [rows2] = await connection.execute("SELECT * FROM usuarios INNER JOIN "+ tipo +" ON usuarios.id = "+ tipo +".id_usuarios WHERE usuarios.id = "+ rows[0].id +"");

  if([rows2].length){

    if(rows2[0].tipo_usuario == "equipo"){

      const equipo = parseEquipo(rows2);
      res.send(equipo);

    }
    if (rows2[0].tipo_usuario == "jugador") {

      const user = parseUser(rows2)
      res.send(user);

    }
  }

}

const parseUser = (results) => {

  return{
    
    id: results[0].id_usuarios,
    nickname: results[0].nickname,
    nombre: results[0].nombre,
    apellidos: results[0].apellidos,
    fecha_nacimiento: results[0].fecha_nacimiento,
    dni: results[0].dni,
    direccion: results[0].direccion,
    email: results[0].email,
    password: results[0].password,
    tipo: results[0].tipo_usuario
  }

}

const parseEquipo = (results) => {

  return{
    
    id: results[0].id_usuarios,
    nickname: results[0].nickname,
    equipo: results[0].nombre_equipo,
    creacion_equipo: results[0].fecha_creacion,
    direccion: results[0].direccion,
    email: results[0].email,
    password: results[0].password,
    tipo: results[0].tipo_usuario
  }

}

const  parsenewUser = (id, verificacion) =>{
  return {
    id: id,
    validacion: verificacion
  }
}
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
  const tipo = rows[0].tipo_usuario;
  
  const [rows2] = await connection.execute("SELECT * FROM usuarios INNER JOIN "+ tipo +" ON usuarios.id = "+ tipo +".id_usuarios WHERE usuarios.id = "+ rows[0].id +"");
  
  if([rows].length){

    if(rows2[0].tipo_usuario == "equipo"){
      
      const equipo = parseEquipo(rows2);
      return equipo;
    }

    if(rows2[0].tipo_usuario == "jugador"){
      const user = parseUser(rows)
      return user;
    }
    
  }
  return null;
  
}

//ID de passport
exports.findByIdByPassport = async(id) => {

  const connection = await model.getConnection();

  const [rows] = await connection.execute('SELECT * FROM `usuarios` WHERE `id` = ?',[id]);
  const tipo = rows[0].tipo_usuario;

  const [rows2] = await connection.execute("SELECT * FROM usuarios INNER JOIN "+ tipo +" ON usuarios.id = "+ tipo +".id_usuarios WHERE usuarios.id = "+ rows[0].id +"");

  if([rows2].length){

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
  console.log("Estoy buscando informacion del usuario");
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
    
    id: results[0].id,
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
    
    id: results[0].id,
    nickname: results[0].nickname,
    equipo: results[0].nombre_equipo,
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
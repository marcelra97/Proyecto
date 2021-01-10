
--Creamos la BBDD
drop database if exists gamejob;
create database gamejob;

--Creamos usuario
drop user if exists marcel;
flush privileges;

CREATE USER 'marcel'@'localhost' IDENTIFIED BY 'marcel97';
GRANT ALL PRIVILEGES ON gamejob.* TO 'marcel'@'localhost';

use gamejob;

-- Create table usuarios (
-- 	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
-- 	nickname VARCHAR(255),
-- 	nombre VARCHAR(255),
-- 	apellidos VARCHAR(255),
-- 	fecha_nacimiento VARCHAR(255),
-- 	dni VARCHAR(255),
-- 	direccion VARCHAR(255),
-- 	email VARCHAR(255),
-- 	password VARCHAR(255)
-- 	); 	

	Create table usuarios (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	nickname VARCHAR(255),
	direccion VARCHAR(255),
	email VARCHAR(255),
	password VARCHAR(255),
	tipo_usuario VARCHAR(255)
	); 	

	Create table jugador (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	nombre VARCHAR(255),
	apellidos VARCHAR(255),
	fecha_nacimiento VARCHAR(255),
	dni VARCHAR(255),
	id_usuarios INT NOT NULL UNIQUE,
	FOREIGN KEY (id_usuarios) REFERENCES usuarios(id) ON DELETE CASCADE ON UPDATE CASCADE
	); 	

	Create table equipo (
	id INT NOT NULL  AUTO_INCREMENT PRIMARY KEY,
	nombre_equipo VARCHAR(255),
	fecha_creacion VARCHAR(255),
	id_usuarios INT NOT NULL UNIQUE,
	FOREIGN KEY (id_usuarios) REFERENCES usuarios(id) ON DELETE CASCADE ON UPDATE CASCADE
	);



--por si hay problemas con el error de conexion con la base de datos--
ALTER USER 'marcel'@'localhost' IDENTIFIED WITH mysql_native_password BY 'marcel97';
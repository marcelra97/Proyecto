const mysql = require('mysql');

let config ={
  host     : 'localhost',
  user     : 'marcel',
  password : 'marcel97',
  database : 'gamejob'
};

let connection = mysql.createConnection(config);

module.exports = connection;
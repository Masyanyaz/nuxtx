const mysql = require('mysql');
// Mysql connection

const db = mysql.createConnection({
  host: '127.0.0.1',
  port: '3306',
  user: 'new',
  password: 'password',
  database: 'new'
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Mysql connected')
});
db.query("SET SESSION wait_timeout = 604800");

module.exports = db;
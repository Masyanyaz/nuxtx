const mysql = require('mysql');
// Mysql connection

const db = mysql.createConnection({
  host: '116.203.230.90',
  port: '3333',
  user: 'new',
  password: '1996zydfhm11',
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
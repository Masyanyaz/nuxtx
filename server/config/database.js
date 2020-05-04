const mysql = require('mysql');
// Mysql connection

const db = mysql.createConnection({
  host: 'us-cdbr-east-06.cleardb.net',
  port: '3306',
  user: 'b4876f9de6263d',
  password: 'dd1445fd',
  database: 'heroku_4cbdaa8e982ef65'
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Mysql connected')
});
db.query("SET SESSION wait_timeout = 604800");

module.exports = db;

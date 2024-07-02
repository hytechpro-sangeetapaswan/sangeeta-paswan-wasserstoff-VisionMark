const mysql = require('mysql');

const dbConnected = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.MYSQL_DB
});

dbConnected.connect((err) => {
  if (err) {
    console.log('Error connecting to database:', err.stack);
    return;
  }
  console.log('Database connected as id', dbConnected.threadId);
});

module.exports = dbConnected;
    
const pg = require('pg');

const db = new pg.Pool({
  user: process.env.DB_USERNAME,
  host: process.env.DB_HOSTNAME,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
});

console.log(`trying to connect database: ${process.env.DB_HOSTNAME}`);

db.connect(err => {
  console.log('connecting...');
  if (err) {
    console.error('database connection error...', err.stack);
  } else {
    console.log('Database connection is successful...');
  }
});
module.exports = db;
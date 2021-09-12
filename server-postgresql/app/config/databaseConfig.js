
const pg = require('pg');

function getPool (req, res) {
  const pool = new pg.Pool({
    user: 'spacekonnect',
    host: 'localhost',
    database: 'foodstreet',
    password: 'spacekonnect',
    port: 5432,
  });
  return pool;
}

module.exports = {
  getPool
}

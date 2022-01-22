const Pool = require('pg').Pool;

const pool = new Pool({
  user: 'postgres', 
  host: 'localhost', 
  database: 'yogadb',
  password: '0048',
  port: 5432
});

module.exports = pool;
/*const Sequelize = require("sequelize");
var sequelize = new Sequelize('api', 'mogus', 'mogus', {
  host: 'localhost',
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },

// SQLite only
   //storage: 'path/to/database.sqlite'
});*/

const Pool = require('pg').Pool
const pool = new Pool({
  user: 'mogus',
  host: 'localhost',
  database: 'api',
  password: 'mogus',
  port: 5432,
})

module.exports = pool;
//module.exports = {Sequelize, sequelize};
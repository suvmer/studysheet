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
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
})

//const query = await connection.query('INSERT INTO users (name, email, password, "isActivated", "activationLink", info, "currentTable", regtime) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id', [name, email, hashPassword, false, activationLink, info, -1, Date.now()])

pool.query(`
CREATE TABLE IF NOT EXISTS userr (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  password TEXT NOT NULL,
  isActivated BOOLEAN,
  activationLink TEXT NOT NULL,
  info TEXT,
  currentTable INTEGER,
  regtime INTEGER
)
`)
pool.query(`INSERT INTO userr(name, password, "isActivated", "activationLink", info, "currentTable", regtime) VALUES ("Мугома", "Абоба", TRUE, "n.ru", "{\"fdfadf\": \"fdf\"}", 0, ${Date.now()})`)

module.exports = pool;
//module.exports = {Sequelize, sequelize};
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

/*const ac = */pool.query(`
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  password TEXT NOT NULL,
  "isActivated" BOOLEAN,
  "activationLink" TEXT,
  info TEXT,
  "currentTable" INTEGER,
  "ownTables" INTEGER[],
  groups INTEGER[],
  regtime BIGINT
)
`);

pool.query(`
CREATE TABLE IF NOT EXISTS tokens (
   userid INTEGER PRIMARY KEY,
  "refreshToken" TEXT NOT NULL,
  "activationLink" TEXT
)
`);
const g = async () => {
  await pool.query(`
  CREATE TABLE IF NOT EXISTS sheets (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    creator INTEGER NOT NULL,
    members INTEGER[],
    groups INTEGER[],
    info TEXT,
    public BOOLEAN DEFAULT FALSE,
    tables TEXT,
    created BIGINT
  )
  `);
  /*await pool.query(`INSERT INTO sheets(name, creator, members) VALUES($1, $2, $3)`, ["Aboba", 1, [5, 7, 6]]);
  await pool.query(`UPDATE sheets SET members = array_append(members, $1)`, [657]);
  const fetchTest = await pool.query('SELECT * from sheets WHERE id = 1');
  console.log(fetchTest.rows[0].members);*/
}
g();

//.then(() => pool.query(`INSERT INTO "users"(name, password, "isActivated", "activationLink", info, "currentTable", regtime) VALUES ('Мугома', 'Абоба', TRUE, 'n.ru', '{"fdfadf": "fdf"}', 0, ${Date.now()})`))
//userid, "refreshToken"
//console.log('inserted', ac, ab)
module.exports = pool;
//module.exports = {Sequelize, sequelize};
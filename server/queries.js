const Pool = require('pg').Pool
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
})

pool.query(`
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
  regtime BIGINT,
  CONSTRAINT "user_unique" UNIQUE ("email")
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
    public BOOLEAN DEFAULT TRUE,
    tables TEXT,
    created BIGINT
  )
  `);
}
g();

module.exports = pool;
require("dotenv").config();
const Pool = require("pg").Pool;

const { PSQL_PASS, PSQL_PORT } = process.env;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "rentals",
  password: PSQL_PASS,
  port: PSQL_PORT,
});

module.exports = pool;

const mysql = require("mysql2");
const createTables = require("./tables");

let db = null;

const initializeDB = async () => {
  db = mysql.createConnection({
    host: process.env.MYSQLHOST,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQLDATABASE,
    port: process.env.MYSQLPORT,
  });
  await db.promise().connect();
  await createTables(db);
};

const getDB = () => db;

module.exports = { initializeDB, getDB };

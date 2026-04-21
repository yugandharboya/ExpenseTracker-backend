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

  db.connect(async (err) => {
    if (err) {
      console.error("DB Connection Error:", err.message);
      return;
    }

    console.log("Connected to MySQL DB");

    try {
      await createTables(db);
    } catch (error) {
      console.error("Table creation error:", error.message);
    }
  });
};

const getDB = () => db;

module.exports = { initializeDB, getDB };

const mysql = require("mysql2/promise");
const createTables = require("./tables");

let db = null;

const initializeDB = async () => {
  try {
    db = await mysql.createPool({
      host: process.env.MYSQLHOST,
      user: process.env.MYSQLUSER,
      password: process.env.MYSQLPASSWORD,
      database: process.env.MYSQLDATABASE,
      port: process.env.MYSQLPORT,

      waitForConnections: true,
      connectionLimit: 5,
      queueLimit: 0,

      connectTimeout: 10000,
      enableKeepAlive: true,
      keepAliveInitialDelay: 0,

      ssl: {
        rejectUnauthorized: false,
      },
    });

    console.log("Connected to MySQL DB");

    await createTables(db);
    console.log("Tables created successfully");
  } catch (err) {
    console.error("DB Connection Error:  ", err);
  }
};

const getDB = () => db;

module.exports = { initializeDB, getDB };

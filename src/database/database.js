import mysql from "mysql";
import { promisify } from "util";
import config from "../config";

const connection = {
  host: config.host,
  database: config.database,
  user: config.user,
  password: config.password,
};

const pool = mysql.createPool(connection);
pool.getConnection((error, connection) => {
  if (error) {
    return console.log("[-] " + error);
  }
  if (connection) {
    console.log("[+] DB CONNECTED.");
    return connection.release();
  }
});

pool.query = promisify(pool.query);

module.exports = pool;

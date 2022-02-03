import fs from 'fs'
import mysql from 'mysql';
import dotenv from 'dotenv';

dotenv.config()

const dbConfig : mysql.PoolConfig = {
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "3306"),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD, 
  database: process.env.DB_DATABASE,
  connectTimeout: parseInt(process.env.DB_CONNECT_TIMEOUT || "10000"),
  multipleStatements: true
}

let connection = mysql.createConnection(dbConfig);
const sql = fs.readFileSync("./tools/reset_table.sql","utf-8");
connection.query(sql, (err, results) => {
    if (err) {
        console.log(err);
        console.log("Table NOT successfully reset.")
    } 
    else {
        console.log("Table successfully reset.")
    }
    connection.end((err) => {
        console.log("Connection closed");
    });
});



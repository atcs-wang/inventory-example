
import mysql from 'mysql';
import util from 'util';
import dotenv from 'dotenv';

dotenv.config()

const dbConfig : mysql.PoolConfig = {
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "3306", 10),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  connectTimeout: parseInt(process.env.DB_CONNECT_TIMEOUT || "10000", 10)
}

// Make a connection pool, instead of just a single connection
const pool = mysql.createPool(dbConfig);

// When we want to make a query, the pool.query() method can be used.
// This is a shortcut for the pool.getConnection() -> connection.query() -> connection.release()
// More efficient use of db connections might do multiple queries on one connection before closing,
// but this is not super important for small applications.

export const queryCallback = pool.query.bind(pool);
// This makes a promise-style wrapper for the query() method
export const queryPromise = util.promisify(pool.query).bind(pool);

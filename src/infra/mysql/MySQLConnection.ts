import mysql from 'mysql2/promise'

const pool = mysql.createPool({
  host: 'mysql',
  user: 'root',
  port: 3306,
  password: 'password',
  database: 'baskhealth',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
})

export default pool

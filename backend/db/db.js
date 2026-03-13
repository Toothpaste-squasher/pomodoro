import * as mysql from 'mysql2';

const secret = process.env;
const pool = mysql.createPool({
  host: secret.DB_HOST,
  port: secret.DB_PORT,
  user: secret.DB_USER,
  password: secret.DB_PASSWORD,
  database: secret.DB_NAME,
}).promise();

const testConnection = () => {
  pool.getConnection()
    .then(res => console.log(res.connection.authorized ? "db connection authorized: true" : "authorized: false"))
    .catch(err => {
      console.log("db connection not successful" + err)
    })
}

export { pool, testConnection };

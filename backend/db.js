const sql = require('mssql')

const sqlConfig = {
  user: 'sa',
  password: '123456789',
  database: 'IPDV',
  server: 'localhost',
 
  options: {
    trustServerCertificate: true // change to true for local dev / self-signed certs
  },
  port: 55588
}


module.exports = sqlConfig;

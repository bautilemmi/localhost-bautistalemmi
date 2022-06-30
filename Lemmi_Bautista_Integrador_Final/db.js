const mysql = require("mysql");
const util = require("util");

const pool = mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    database: "users",
    user: "root",
    password: ""
});

pool.getConnection((err, con)=>{
    err
       ?console.error(`Codigo de error: ${err.errno} | Tipo de error: ${err.message}`)
       :
       console.log("Conexión con la base de datos OK!" + con);
})


pool.query=util.promisify(pool.query);
module.exports = pool
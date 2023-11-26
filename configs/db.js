const { json } = require('express');
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Mysql#123',
    database: 'mydb',
    port: 3306
});
// var connection = pool.connect((err) => {
//     if (err) {
//         console.log(`Erro in DB connection`+ JSON.stringify(err,undefined,2));
//     } else {
//         console.log("DB connected Successfully");
//     }
//  })

module.exports = pool;
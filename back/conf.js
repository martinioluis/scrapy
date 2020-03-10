const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'a7d1ebctg',
    database: 'zoolky',
});

module.exports = connection;
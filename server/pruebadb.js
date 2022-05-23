const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'cero000000',
    port: 3306,
    database: 'GWL_DB_MODEL'
});

connection.connect((err) => {
    if (err) {
        return console.log(err.message);
    }

    connection.query('select * from users', (err, result) => {
        if (err) return console.log(err.message);
        console.log(result);
   });

  

});
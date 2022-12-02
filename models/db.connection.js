const mysql = require('mysql2');

const pool = mysql.createPool({
    host: "127.0.0.1",
    user: "root",
    password: "gagan@sql",
    database: "dashboard",
  });
//   let connection = mysql.createConnection({
//     host: '127.0.0.1',
//     user: 'root',
//     password: 'gagan@sql',
//     database: 'dashboard',
// });


// connection.connect(function(err) {
//     if (err) {
//       return console.error('error: ' + err.message);
//     }
  
//     console.log('Connected to the MySQL server.');
//   });
  
 let query = ( sql, values ) => {
  
    return new Promise(( resolve, reject ) => {
      pool.getConnection( (err, connection) => {
        if (err) {
            console.log(err)
          reject( err )
        } else {
          connection.query(sql, values, ( err, rows) => {
            if ( err ) {
                console.log(err)
              reject( err )
            } else {
              resolve( rows )
            }
            connection.release()
          })
        }
      })
    })
  
  };

  module.exports = query;
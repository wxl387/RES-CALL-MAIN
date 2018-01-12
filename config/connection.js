// Set up MySQL connection.
var mysql = require("mysql");

var connection = mysql.createConnection("");

// if (process.env.JAWSDB_URL) {
//   var connection = mysql.createConnection(process.env.JAWSDB_URL);
// } else {
//   connection = mysql.createConnection({
//   socketPath: "/Applications/MAMP/tmp/mysql/mysql.sock",
//   user: "root",
//   password: "root",
//   database: "resCallDB",
//   port: "8889"
//   });
// };

// Make connection.
connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

// Export connection for our ORM to use.
module.exports = connection;

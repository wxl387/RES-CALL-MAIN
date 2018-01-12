// Set up MySQL connection.
var mysql = require("mysql");

var connection = mysql.createConnection("mysql://sc6pssmesql2veha:yaqwru910enqhivp@izm96dhhnwr2ieg0.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/k9hjz95uqz6gonet");

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

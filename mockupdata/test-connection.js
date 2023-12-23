var mysql = require("mysql");

var con = mysql.createConnection({
  host: "localhost",
  user: "qltt",
  password: "password",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
  con.end();
});

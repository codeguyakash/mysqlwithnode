const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "node_db",
});
connection.connect();

connection.query("SELECT * FROM users", (err, rows) => {
  if (err) throw err;
  console.log(rows);
});

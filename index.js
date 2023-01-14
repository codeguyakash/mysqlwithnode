const express = require("express");
const mysql = require("mysql2");
const app = express();
const bodyParser = require("body-parser");
// const dotenv = require("dotenv");

const port = process.env.PORT || 3000;
// dotenv.config();
app.use(bodyParser.json());

//Create Connection with Database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Hackwell@943",
  database: "users_db",
});
connection.connect();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

//get users
connection.query("SELECT * FROM users", (err, rows) => {
  if (err) throw err;
  app.get("/users", (req, res) => {
    res.send(rows);
  });
  console.log(rows);
});
//for create user
app.post("/user", (req, res) => {
  const { username, password } = req.body;
  connection.query(`INSERT INTO users (username,password) VALUE (?, ? )`, [
    username,
    password,
  ]);
  res.status(201).json({ message: "User Created" });
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});

require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database");

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
connection.connect();

app.get("/", (req, res) => {
  res.send("Welcome Server is Running");
});
//read blogs
app.get("/blog", (req, res) => {
  const readQuery = "SELECT * FROM blog";
  connection.query(readQuery, (err, rows) => {
    if (err) throw err;
    res.status(200).json(rows);
  });
});
//read blog by id
app.get("/:id", (req, res) => {
  const { id } = req.params;
  const readQuery = "SELECT * FROM blog WHERE id = ?";
  connection.query(readQuery, [id], (err, rows) => {
    if (err) throw err;
    res.status(200).json(rows);
  });
});
//create blogs
app.post("/create", (req, res) => {
  const { title, description } = req.body;
  const insertQuery = "INSERT INTO blog (title, description) VALUES (?, ?)";
  connection.query(insertQuery, [title, description], (err, result) => {
    if (err) {
      res.status(500).json({ error: "Error Occurred" });
    } else {
      res.status(201).json({ message: "Blog Created" });
    }
  });
});
//delete blogs
app.delete("/:id", (req, res) => {
  const { id } = req.params;
  console.log(id);
  const deleteQuery = "DELETE FROM blog WHERE id = ?";
  connection.query(deleteQuery, [id], (err, result) => {
    if (err) {
      res.status(500).json({ error: "Error Occurred" });
    } else {
      res.status(200).json({ message: "Delete Success" });
    }
  });
});
//uodate blogs
app.put("/:id", (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  console.log(id);
  const updateQuery = "UPDATE blog SET title = ?, description = ? WHERE id = ?";
  connection.query(updateQuery, [title, description, id], (err, result) => {
    if (err) {
      res.status(500).json({ error: "Error Occurred" });
    } else {
      res.status(200).json({ message: "Update Success" });
    }
  });
});

app.listen(port, () => {
  console.log(`server running on http://localhost:${port}`);
});

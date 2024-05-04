require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connecDB = require("./database");

const port = process.env.PORT || 3000;
app.use(bodyParser.json());

app.get("/", (_, res) => {
  res.json({
    message: "Welcome Server is Running",
    success: true,
    statusCode: 200,
    date: new Date().toISOString(),
  });
});

connecDB().then((databaseInstance) => {
  console.log("DB Connected!!");
  app.get("/ok", async (req, res) => {
    const result = await databaseInstance.query("select * from blogs");
    console.log(console.log(result));

    return res.send("OKK");
  });

  // Read all blogs -----------------------------------------
  app.get("/blogs", async (req, res) => {
    try {
      const readQuery = "SELECT * FROM blogs";
      const [rows, fields] = await databaseInstance.query(readQuery);
      res.status(200).json(rows);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Error Occurred" });
    }
  });

  // Read blogs by id ---------------------------------------
  app.get("/blogs/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const readQuery = "SELECT * FROM blogs WHERE id = ?";
      const result = await databaseInstance.query(readQuery, [id]);
      res.status(200).json(result[0]);
    } catch (error) {
      console.log(err);
      res.status(500).json({ error: "Error Occurred" });
    }
  });

  // Create a blog -----------------------------------------
  app.post("/blogs/create", async (req, res) => {
    const { title, description, author, category } = req.body;
    try {
      const insertQuery =
        "INSERT INTO blogs (title, description, author, category) VALUES (?, ?, ?, ?)";
      const result = await databaseInstance.query(insertQuery, [
        title,
        description,
        author,
        category,
      ]);
      res.status(201).json({ message: "Blog Created", result });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Error Occurred" });
    }
  });

  // Delete a blog ----------------------------------------
  app.delete("/blogs/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const deleteQuery = "DELETE FROM blogs WHERE id = ?";
      const result = await databaseInstance.query(deleteQuery, [id]);
      res.status(200).json({ message: "Delete Success", result });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Error Occurred" });
    }
  });

  // Update a blog ----------------------------------------
  app.put("/blogs/:id", async (req, res) => {
    const { id } = req.params;
    const { title, description, author, category } = req.body;

    try {
      const updateQuery =
        "UPDATE blogs SET title = ?, description = ?, author = ?, category = ? WHERE id = ?";
      const result = await databaseInstance.query(updateQuery, [
        title,
        description,
        author,
        category,
        id,
      ]);
      res.status(200).json({ message: "Update Success", result });
    } catch (err) {
      res.status(500).json({ error: "Error Occurred" });
    }
  });
});

app.listen(port, () => {
  console.log(`[Server Running][http://localhost:${port}]`);
});

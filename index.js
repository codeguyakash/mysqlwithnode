require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connectDB = require("./database");

const port = process.env.PORT || 3000;
app.use(bodyParser.json());

app.get("/", (req, res) => {
  const ip =
    req.headers["x-real-ip"] ||
    req.headers["cf-connectiong-ip"] ||
    req.headers["x-forwarded-for"] ||
    req.socket.remoteAddress ||
    "";
  res.json({
    message: "Welcome Server is Running",
    success: true,
    statusCode: 200,
    clientIP: ip,
    date: new Date().toISOString(),
  });
});

connectDB()
  .then((databaseInstance) => {
    console.log(`[DB Connected Success!!]`);
    // Read all blogs  ---------------------------------------
    app.get("/blogs", async (_, res) => {
      try {
        const readQuery = "SELECT * FROM blogs";
        const [rows] = await databaseInstance.query(readQuery);
        if (rows.length == 0) {
          throw new Error("No Blog Found");
        } else {
          res.status(200).json(rows);
        }
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Something Went Wrong" });
      }
    });

    // Read blogs by id ---------------------------------------
    app.get("/blog/:id", async (req, res) => {
      const { id } = req.params;
      try {
        const readQuery = "SELECT * FROM blogs WHERE id = ?";
        const [row] = await databaseInstance.query(readQuery, [id]);
        if (row.length == 0) {
          throw new Error("No Blog Found");
        } else {
          res.status(200).json(row);
        }
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    });

    // Create a blog -----------------------------------------
    app.post("/blog/create", async (req, res) => {
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
        const insertId = result[0].insertId;
        res
          .status(201)
          .json({ message: "Blog Created", createdBlogId: insertId });
      } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Error Occurred" });
      }
    });

    // Delete a blog ----------------------------------------
    app.delete("/blog/:id", async (req, res) => {
      const { id } = req.params;
      try {
        const deleteQuery = "DELETE FROM blogs WHERE id = ?";
        const result = await databaseInstance.query(deleteQuery, [id]);
        const affectedRows = result[0].affectedRows;
        if (affectedRows) {
          res
            .status(200)
            .json({ message: "Delete Success", deletedBlogId: id });
        } else {
          throw new Error("No Blog Found");
        }
      } catch (error) {
        res.status(404).json({ message: error.message });
      }
    });

    // Update a blog ----------------------------------------
    app.put("/blog/:id", async (req, res) => {
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
        const affectedRows = result[0].affectedRows;
        if (affectedRows) {
          res
            .status(200)
            .json({ message: "Updated Success", updatedBlogId: id });
        } else {
          throw new Error("No Blog Found");
        }
      } catch (error) {
        res.status(404).json({ message: error.message });
      }
    });
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error.message);
    res.status(500).json({
      error: "Error connecting to the database. Please try again later.",
    });
  });
app.listen(port, () => {
  console.log(`[Server Running....${port}]`);
});

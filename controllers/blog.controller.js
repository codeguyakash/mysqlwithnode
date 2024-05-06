const connectDB = require("../database.js");

connectDB().then((databaseInstance) => {
  //****************Create Blog*************************
  const createBlog = async (req, res) => {
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
  };
  //****************Read Blog*************************
  const readBlog = async (_, res) => {
    try {
      const readQuery = "SELECT * FROM blogs";
      const [rows, fields] = await databaseInstance.query(readQuery);
      res.status(200).json(rows);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Error Occurred" });
    }
  };
  //****************Read Blog By Id *************************
  const readBlogById = async (req, res) => {
    const { id } = req.params;
    try {
      const readQuery = "SELECT * FROM blogs WHERE id = ?";
      const result = await databaseInstance.query(readQuery, [id]);
      res.status(200).json(result[0]);
    } catch (error) {
      console.log(err);
      res.status(500).json({ error: "Error Occurred" });
    }
  };
  //****************Update Blog *************************
  const updateBlog = async (req, res) => {
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
  };
  //***************Delete Blog *************************
  const deleteBlog = async (req, res) => {
    const { id } = req.params;
    try {
      const deleteQuery = "DELETE FROM blogs WHERE id = ?";
      const result = await databaseInstance.query(deleteQuery, [id]);
      res.status(200).json({ message: "Delete Success", result });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Error Occurred" });
    }
  };

  module.exports = {
    createBlog,
    readBlog,
    updateBlog,
    deleteBlog,
    readBlogById,
  };
});

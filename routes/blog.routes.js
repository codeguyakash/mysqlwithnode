const express = require("express");
const {
  createBlog,
  readBlog,
  updateBlog,
  deleteBlog,
  readBlogById,
} = require("../controllers/blog.controller.js");

const router = express.Router();

router.get("/blogs", readBlog);
router.get("/blogs/:id", readBlogById);
router.delete("/blogs/:id", deleteBlog);
router.put("/blogs/:id", updateBlog);
router.post("/blogs/create", createBlog);

module.exports = router;

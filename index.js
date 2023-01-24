const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Welcome Server is Running");
});

app.listen(port, () => {
  console.log(`server running on http://localhost:${port}`);
});

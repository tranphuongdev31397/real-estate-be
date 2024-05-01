const express = require("express");
const cors = require("cors");
const db = require("./models/index.js");
const app = express();
require("dotenv").config();
require("./configs/db.js");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World");
  console.log(db);
});

module.exports = app;

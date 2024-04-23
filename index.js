const express = require("express");
const cors = require("cors");
const dbConnect = require("./configs/db");
const app = express();

require("dotenv").config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

dbConnect();

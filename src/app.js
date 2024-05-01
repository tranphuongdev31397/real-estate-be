const express = require("express");
const cors = require("cors");
const db = require("./models/index.js");
const { errorHandler, asyncHandler } = require("./middlewares/index.js");
const {
  ConflictRequestError,
  AuthFailError,
  BadRequestError,
} = require("./core/error.response.js");
const app = express();
require("dotenv").config();
require("./configs/db.js");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get(
  "/",
  asyncHandler((req, res) => {
    res.send("Hello World");
  })
);

app.get(
  "/test-errors",
  asyncHandler((req, res) => {
    throw new BadRequestError();
    res.send("Hello World");
  })
);

app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});
app.use(errorHandler);

module.exports = app;

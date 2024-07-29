const express = require("express");
const cors = require("cors");
const {
  errorHandler,
  asyncHandler,
  permissionHandler,
} = require("./middlewares/index.js");
const {
  ConflictRequestError,
  AuthFailError,
  BadRequestError,
} = require("./core/error.response.js");
const router = require("./routes/v1/index.js");
const { pingServer } = require("./utils/cron.js");
const app = express();
require("dotenv").config();
require("./configs/db.js");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get(
  "/get-ip",
  asyncHandler((req, res) => {
    const ipAddresses =
      req.headers["cf-connecting-ip"] ||
      req.headers["x-real-ip"] ||
      req.headers["x-forwarded-for"] ||
      req.socket.remoteAddress ||
      "";
    res.send(ipAddresses);
  })
);

app.get(
  "/",
  asyncHandler((req, res) => {
    res.send("Hello World");
  })
);

app.use(router);

app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});
app.use(errorHandler);

pingServer.start();

module.exports = app;

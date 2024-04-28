const fs = require("fs");
const ENV = require("./env");
const { dbOptions } = require("./db");

module.exports = {
  development: {
    username: ENV.DB_USERNAME,
    password: ENV.DB_PASSWORD,
    database: ENV.DB_NAME,
    host: "127.0.0.1",
    dialect: ENV.DB_DIALECT,
    ...dbOptions,
  },
};

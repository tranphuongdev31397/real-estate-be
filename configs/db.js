const { Sequelize } = require("sequelize");
require("dotenv").config();
const ENV = require("./env");

const sequelize = new Sequelize(ENV.DB_NAME, ENV.DB_USERNAME, ENV.DB_PASSWORD, {
  host: ENV.DB_HOST,
  dialect: ENV.DB_DIALECT,
});

const dbConnect = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

module.exports = dbConnect;

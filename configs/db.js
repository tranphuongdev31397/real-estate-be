const { Sequelize } = require("sequelize");
require("dotenv").config();
const ENV = require("./env");

const dbOptions = {
  logging: false,
  timezone: "+07:00",
};

const sequelize = new Sequelize(ENV.DB_NAME, ENV.DB_USERNAME, ENV.DB_PASSWORD, {
  host: ENV.DB_HOST,
  dialect: ENV.DB_DIALECT,
  ...dbOptions,
});

const dbConnect = async () => {
  try {
    await sequelize.authenticate();
    console.log("[SQL] db connected");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
module.exports = {
  dbOptions,
};
module.exports = dbConnect;

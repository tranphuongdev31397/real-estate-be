const cron = require("node-cron");
const axios = require("axios");

const pingServer = cron.schedule("*/14 * * * *", async () => {
  try {
    await axios.get("https://real-estate-be-heoz.onrender.com/");
    const now = new Date();
    console.log(`Ping server at  ${now}`);
  } catch (err) {
    console.log(err);
  }
});

module.exports = {
  pingServer,
};

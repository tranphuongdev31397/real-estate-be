const cloudinary = require("cloudinary").v2;
const ENV = require("./env");

function config() {
  try {
    cloudinary.config({
      cloud_name: ENV.CLOUDINARY_CLOUD_NAME,
      api_key: ENV.CLOUDINARY_API_KEY,
      api_secret: ENV.CLOUDINARY_API_SECRET, // Click 'View API Keys' above to copy your API secret
    });

    console.log("Connect to cloudinary");
  } catch (e) {
    console.log(e);
  }
}

module.exports = {
  config,
  cloudinary,
};

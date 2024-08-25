const { cloudinary } = require("../configs/cloudinary");
// Upload an image
const uploadResult = async (req, res) => {
  try {
    await cloudinary.uploader.upload(
      "https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg",
      {}
    );
    // console.log(res);
  } catch (err) {
    throw err;
  }
};

// Optimize delivery by resizing and applying auto-format and auto-quality
const optimizeUrl = (file) => {
  return cloudinary.url(file, {
    fetch_format: "auto",
    quality: "auto",
  });
};

console.log(optimizeUrl);

// Transform the image: auto-crop to square aspect_ratio
const autoCropUrl = () => {
  cloudinary.url("shoes", {
    crop: "auto",
    gravity: "auto",
    width: 500,
    height: 500,
  });
};

module.exports = {
  autoCropUrl,
  uploadResult,
  optimizeUrl,
};

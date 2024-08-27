const { cloudinary } = require("../configs/cloudinary");
// Upload an image

// Optimize delivery by resizing and applying auto-format and auto-quality
const optimizeUrl = (file) => {
  return cloudinary.url(file, {
    fetch_format: "auto",
    quality: "auto",
  });
};

// Transform the image: auto-crop to square aspect_ratio
const autoCropUrl = (file) => {
  cloudinary.url(file, {
    crop: "auto",
    gravity: "auto",
    width: 500,
    height: 500,
  });
};

module.exports = {
  autoCropUrl,
  optimizeUrl,
};

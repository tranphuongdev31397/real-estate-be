const multer = require("multer");

const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    console.log("multer", file);
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;

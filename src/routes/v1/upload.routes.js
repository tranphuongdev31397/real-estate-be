const {
  uploadController,
  uploadMultiController,
} = require("../../controllers/upload.controller");
const { asyncHandler } = require("../../middlewares");
const upload = require("../../middlewares/multer");

const uploadRouter = require("express").Router();

const MAXIMUM_UPLOAD = 10;

uploadRouter.post("/", upload.single("image"), asyncHandler(uploadController));
uploadRouter.post(
  "/multi",
  upload.array("images", MAXIMUM_UPLOAD),
  asyncHandler(uploadMultiController)
);

module.exports = uploadRouter;

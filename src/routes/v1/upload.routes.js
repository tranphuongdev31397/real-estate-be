const { uploadController } = require("../../controllers/upload.controller");
const { asyncHandler } = require("../../middlewares");
const upload = require("../../middlewares/multer");
const UploadService = require("../../services/upload.service");

const uploadRouter = require("express").Router();

uploadRouter.post("/", upload.single("image"), asyncHandler(uploadController));

module.exports = uploadRouter;

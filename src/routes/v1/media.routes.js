const {
  deleteOneMedia,
  deleteManyMedia,
} = require("../../controllers/media.controller");
const {
  uploadController,
  uploadMultiController,
} = require("../../controllers/upload.controller");
const { asyncHandler } = require("../../middlewares");
const upload = require("../../middlewares/multer");

const mediaRouter = require("express").Router();

const MAXIMUM_UPLOAD = 10;

mediaRouter.post(
  "/upload",
  upload.single("image"),
  asyncHandler(uploadController)
);

mediaRouter.post(
  "/upload/multi",
  upload.array("images", MAXIMUM_UPLOAD),
  asyncHandler(uploadMultiController)
);

mediaRouter.delete("/:id", asyncHandler(deleteOneMedia));

mediaRouter.post("/delete-multi", asyncHandler(deleteManyMedia));

module.exports = mediaRouter;

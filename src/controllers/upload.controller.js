const { BadRequestError } = require("../core/error.response");
const { SuccessResponse } = require("../core/success.response");
const UploadService = require("../services/upload.service");

const uploadController = async (req, res, next) => {
  const { file, type } = req;
  if (!file) {
    throw new BadRequestError("No file uploaded.");
  }
  const response = await UploadService.uploadSingle({ file });
  return new SuccessResponse({
    metadata: response,
  }).send(res);
};

module.exports = {
  uploadController,
};

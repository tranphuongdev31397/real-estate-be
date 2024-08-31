const { BadRequestError } = require("../core/error.response");
const { SuccessResponse } = require("../core/success.response");
const UploadService = require("../services/upload.service");
const { getInitData } = require("../utils");

const uploadController = async (req, res, next) => {
  const { file, type } = req;
  if (!file) {
    throw new BadRequestError("No file uploaded.");
  }
  const response = await UploadService.uploadSingle({ file });
  return new SuccessResponse({
    metadata: getInitData({
      object: response,
      fields: ["public_id", "mimetype", "secure_url"],
    }),
  }).send(res);
};

const uploadMultiController = async (req, res, next) => {
  const { files, type } = req;

  console.log(files);
  if (!files || files.length === 0) {
    throw new BadRequestError("No files uploaded.");
  }

  const responses = await Promise.all(
    files.map(async (file) => {
      const responseFile = await UploadService.uploadSingle({ file });
      return getInitData({
        object: responseFile,
        fields: ["public_id", "mimetype", "secure_url"],
      });
    })
  );

  return new SuccessResponse({
    metadata: responses,
  }).send(res);
};

module.exports = {
  uploadController,
  uploadMultiController,
};

const { CLOUDINARY_FOLDERS } = require("../contants/cloudinary");
const { BadRequestError } = require("../core/error.response");
const { SuccessResponse } = require("../core/success.response");
const UploadService = require("../services/upload.service");
const { getInitData } = require("../utils");

const uploadController = async (req, res, next) => {
  const {
    file,
    body: { type },
  } = req;

  if (!file) {
    throw new BadRequestError("No file uploaded.");
  }
  const response = await UploadService.uploadSingle({
    file,
    options: {
      folder: type || CLOUDINARY_FOLDERS.OTHERS,
    },
  });
  return new SuccessResponse({
    metadata: response,
  }).send(res);
};

const uploadMultiController = async (req, res, next) => {
  const {
    files,
    body: { type },
  } = req;

  if (!files || files.length === 0) {
    throw new BadRequestError("No files uploaded.");
  }

  const responses = await Promise.all(
    files.map(async (file) => {
      const responseFile = await UploadService.uploadSingle({
        file,
        options: {
          folder: type || CLOUDINARY_FOLDERS.OTHERS,
        },
      });
      return { ...responseFile.response.dataValues };
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

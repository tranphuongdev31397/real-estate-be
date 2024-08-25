const { cloudinary } = require("../configs/cloudinary");
const { CLOUDINARY_FOLDERS } = require("../contants/cloudinary");
const { BadRequestError } = require("../core/error.response");

class UploadService {
  static async uploadSingle({ file, options, resize }) {
    const res = await cloudinary.uploader.upload(file.path, {
      folder: CLOUDINARY_FOLDERS.IMAGES,
      ...options,
    });

    if (!res) {
      throw new BadRequestError("Failed to upload file");
    }
    return res;
  }
}

module.exports = UploadService;

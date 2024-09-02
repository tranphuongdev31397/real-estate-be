const { cloudinary } = require("../configs/cloudinary");
const { CLOUDINARY_FOLDERS } = require("../contants/cloudinary");
const { BadRequestError } = require("../core/error.response");
const db = require("../models");
const MediaService = require("./media.service");

class UploadService {
  static async uploadSingle({ file, options }) {
    const res = await cloudinary.uploader.upload(file.path, {
      folder: CLOUDINARY_FOLDERS.IMAGES,
      ...options,
    });

    const data = await db.Media.create({
      publicId: res.public_id,
      url: res.secure_url,
      filename: res.filename,
      mimetype: file.mimetype,
      created_at: res.created_at,
    });
    if (!res) {
      throw new BadRequestError("Failed to upload file");
    }
    return {
      ...res,
      mimetype: file.mimetype,
    };
  }
}

module.exports = UploadService;

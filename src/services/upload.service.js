const { cloudinary } = require("../configs/cloudinary");
const { CLOUDINARY_FOLDERS } = require("../contants/cloudinary");
const { BadRequestError } = require("../core/error.response");
const MediaService = require("./media.service");

class UploadService {
  static async uploadSingle({ file, options }) {
    const res = await cloudinary.uploader.upload(file.path, {
      folder: CLOUDINARY_FOLDERS.OTHERS,
      resource_type: "auto",
      ...options,
    });

    if (!res || !res.secure_url || !res.public_id) {
      throw new BadRequestError("Failed to upload file");
    }

    const response = await MediaService.create({
      body: {
        publicId: res.public_id,
        url: res.secure_url,
        filename: res.original_filename,
        mimetype: file.mimetype,
      },
    });

    return response;
  }
}

module.exports = UploadService;

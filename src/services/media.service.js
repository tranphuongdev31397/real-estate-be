const { cloudinary } = require("../configs/cloudinary");
const db = require("../models");
const CRUDService = require("./CRUD.service");

class MediaService extends CRUDService {
  constructor() {
    super({ model: db.Media });
  }

  async deleteOne({ id }) {
    const { data } = await super.deleteOne({ id });

    if (data) {
      await cloudinary.uploader.destroy(data.publicId, {
        invalidate: true,
      });
    }

    return {
      data,
    };
  }

  async deleteMany({ ids }) {
    const { data } = await super.deleteMany({ ids });

    if (data) {
      const publicIds = data.map((media) => media.publicId);
      await cloudinary.api.delete_resources(publicIds, {
        invalidate: true,
      });
    }

    return {
      data,
    };
  }
}

module.exports = new MediaService();

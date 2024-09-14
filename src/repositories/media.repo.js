const { cloudinary } = require("../configs/cloudinary");
const {
  NotFoundError,
  BadRequestError,
  ServerError,
} = require("../core/error.response");
const db = require("../models");

const createRelation = async ({ mediaId, relationId, relationModel }) => {
  const mediaFound = await db.Media.findByPk(mediaId);
  if (!mediaFound) {
    return false;
  }
  if (mediaFound.relationId) {
    return false;
  }

  return await mediaFound.update({
    relation: relationModel.name,
    relationId: relationId,
  });
};

const deleteMedia = async (mediaId) => {
  const mediaFound = await db.Media.findByPk(mediaId);
  if (mediaFound) {
    await mediaFound.destroy();
    await cloudinary.uploader.destroy(mediaFound.publicId, {
      invalidate: true,
    });
    console.log("first");
    return true;
  }
};

const updateRelation = async ({
  oldMediaId,
  mediaId,
  relationId,
  relationModel,
}) => {
  if (oldMediaId) {
    // Old media id can be null => don't need remove
    const deleted = deleteMedia(oldMediaId);
    if (!deleted) {
      throw new ServerError(`Delete Media: Something went wrong!`);
    }
  }
  // Create relation of new media
  return await createRelation({
    mediaId,
    relationId,
    relationModel,
  });
};

module.exports = {
  createRelation,
  updateRelation,
  deleteMedia,
};

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
    cloudinary.uploader.destroy(mediaFound.publicId, {
      invalidate: true,
    });
    return true;
  }
};

const deleteManyMedia = async (mediaIds) => {
  const mediasFound = await db.Media.findAll({
    where: { id: mediaIds },
  });

  console.log(mediasFound);

  if (mediasFound) {
    const publicIds = mediasFound.map((media) => media.publicId);

    await db.Media.destroy({
      where: {
        id: mediaIds,
      },
    });
    cloudinary.api.delete_resources(publicIds, {
      invalidate: true,
    });
    return true;
  }

  return false;
};

const updateRelation = async ({
  oldMediaId,
  mediaId,
  relationId,
  relationModel,
}) => {
  if (oldMediaId) {
    // Old media id can be null => don't need remove
    const deleted = await deleteMedia(oldMediaId);
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
  deleteManyMedia,
};

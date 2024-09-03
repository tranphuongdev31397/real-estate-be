const { SuccessResponse } = require("../core/success.response");
const MediaService = require("../services/media.service");

const deleteOneMedia = async (req, res, next) => {
  const { id } = req.params;

  const deletedMedia = await MediaService.deleteOne({
    id,
  });
  return new SuccessResponse({
    metadata: deletedMedia,
  }).send(res);
};

const deleteManyMedia = async (req, res, next) => {
  const { ids } = req.body;

  const deletedMedia = await MediaService.deleteMany({
    ids,
  });
  return new SuccessResponse({
    metadata: deletedMedia,
  }).send(res);
};

module.exports = {
  deleteOneMedia,
  deleteManyMedia,
};

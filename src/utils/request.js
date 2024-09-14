const { BelongsTo, BelongsToMany } = require("sequelize");
const db = require("../models");

const associationMedia = ({
  belongModel,
  foreignKey,
  as = "media",
  attributes = ["id", "url", "relation", "relationId"],
}) => {
  return {
    model: db.Media,
    required: false,
    attributes,
    association: new BelongsTo(belongModel, db.Media, {
      targetKey: "id",
      foreignKey,
      constraints: false,
      as,
    }),
  };
};

module.exports = {
  associationMedia,
};

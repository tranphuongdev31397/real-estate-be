const db = require("../models");
const findUserById = async (userId) => {
  return db.User.findOne({
    where: {
      id: userId,
    },
  });
};

module.exports = { findUserById };

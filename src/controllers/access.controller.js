const { Created, SuccessResponse } = require("../core/success.response");
const AccessService = require("../services/access.service");

const signUpController = async (req, res, next) => {
  const data = await AccessService.signUp({ ...req.body });
  return new Created({
    metadata: data,
  }).send(res);
};

const signInController = async (req, res, next) => {
  const data = await AccessService.signIn({ ...req.body });

  return new SuccessResponse({
    metadata: data,
  }).send(res);
};

module.exports = {
  signUpController,
  signInController,
};

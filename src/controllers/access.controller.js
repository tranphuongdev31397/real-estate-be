const { BadRequestError, AuthFailError } = require("../core/error.response");
const { Created, SuccessResponse, OK } = require("../core/success.response");
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

const signOutController = async (req, res, next) => {
  const keyStore = req.keyStore;
  if (!keyStore) {
    throw new BadRequestError();
  }
  const data = await AccessService.signOut(keyStore);

  return new OK({
    metadata: data,
  }).send(res);
};

const refreshTokenController = async (req, res, next) => {
  const keyStore = req.keyStore;
  const user = req.userInfo;
  if (!keyStore || req.refreshToken !== keyStore.refreshToken) {
    throw new AuthFailError("Invalid Token");
  }
  const tokens = await AccessService.refreshToken({
    user,
  });

  return new OK({
    metadata: {
      tokens,
    },
  }).send(res);
};

module.exports = {
  signUpController,
  signInController,
  signOutController,
  refreshTokenController,
};

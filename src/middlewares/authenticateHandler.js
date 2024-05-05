const ENV = require("../configs/env");
const { HEADER } = require("../contants/request");
const { AuthFailError } = require("../core/error.response");
const JWT = require("jsonwebtoken");
const asyncHandler = require("./asyncHandler");
const KeyTokenService = require("../services/keyToken.service");
const authenticateHandler = asyncHandler(async (req, res, next) => {
  const refreshToken = req.headers?.[HEADER.REFRESH_TOKEN];

  console.log(refreshToken);

  console.log(req);
  const accessToken = req.headers?.[HEADER.AUTHORIZATION];
  const accessTokenSplit = accessToken.replaceAll("Bearer ", "");

  const userPayload = JWT.decode(accessTokenSplit);

  console.log("payload::::", userPayload);
  if (!accessToken || !userPayload) {
    throw new AuthFailError();
  }

  const keyStore = await KeyTokenService.getKeyTokenByUserId(userPayload.id);

  if (!keyStore) {
    throw new AuthFailError();
  }

  if (refreshToken) {
    // TODO: refresh token flow
    JWT.verify(refreshToken, keyStore.privateKey, (error, decode) => {
      if (error) {
        throw new AuthFailError();
      }
    });
  }

  JWT.verify(accessTokenSplit, ENV.JWT_SECRET, (error, decode) => {
    if (error) {
      throw new AuthFailError("Token expired!", 409);
    }
  });

  req.userInfo = userPayload;
  req.keyStore = keyStore;
  next();
});

module.exports = authenticateHandler;

const ENV = require("../configs/env");
const { HEADER } = require("../contants/request");
const { AuthFailError } = require("../core/error.response");
const JWT = require("jsonwebtoken");
const asyncHandler = require("./asyncHandler");
const authenticateHandler = asyncHandler(async (req, res, next) => {
  const refreshToken = req.headers?.[HEADER.REFRESH_TOKEN];
  const accessToken = req.headers?.[HEADER.AUTHORIZATION];
  if (!accessToken) {
    throw new AuthFailError();
  }

  if (refreshToken) {
    // TODO: refresh token flow
  } else {
    const accessTokenSplit = accessToken.replaceAll("Bearer ", "");
    JWT.verify(accessTokenSplit, ENV.JWT_SECRET, (error, decode) => {
      if (error) {
        throw new AuthFailError("Token expired!", 409);
      } else {
        req.userInfo = decode;
        next();
      }
    });
  }
});

module.exports = authenticateHandler;

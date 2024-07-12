const ENV = require("../configs/env");
const { HEADER, ErrorCode } = require("../contants/request");
const { AuthFailError, ErrorResponse } = require("../core/error.response");
const JWT = require("jsonwebtoken");
const asyncHandler = require("./asyncHandler");
const KeyTokenService = require("../services/keyToken.service");
const AccessService = require("../services/access.service");
const authenticateHandler = asyncHandler(async (req, res, next) => {
  const refreshToken = req.headers?.[HEADER.REFRESH_TOKEN];

  const bearerToken = req.headers?.[HEADER.AUTHORIZATION];

  if (!bearerToken) {
    throw new AuthFailError();
  }

  const [accessToken, _bearerMethod] = bearerToken.split(" ").reverse();

  const userPayload = JWT.decode(accessToken);
  if (!accessToken || !userPayload) {
    throw new AuthFailError();
  }

  const keyStore = await KeyTokenService.getKeyTokenByUserId(userPayload?.id);
  if (!keyStore) {
    throw new AuthFailError();
  }

  if (refreshToken) {
    JWT.verify(
      refreshToken,
      keyStore.privateKey,
      asyncHandler(async (error, decode) => {
        if (error) {
          // Clear keyToken in DB
          await AccessService.signOut(req.keyStore); // TODO: [FE] Need remove sign out function because BE removed token information => FE can't call sign-out, just clear storage

          throw new ErrorResponse("Token expired!", 403, {
            errorCode: ErrorCode.RefreshTokenExpired,
          });
        }
      })
    );
  } else {
    JWT.verify(
      accessToken,
      ENV.JWT_SECRET,
      asyncHandler(async (error, decode) => {
        if (error) {
          throw new ErrorResponse("Token expired!", 403, {
            errorCode: ErrorCode.AccessTokenExpired,
          });
        }
      })
    );
  }

  req.userInfo = userPayload;
  req.keyStore = keyStore;
  req.refreshToken = refreshToken;

  next();
});

module.exports = authenticateHandler;

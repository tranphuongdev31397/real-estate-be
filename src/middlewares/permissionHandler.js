const { isEmpty, isArray } = require("lodash");
const asyncHandler = require("./asyncHandler");
const { BadRequestError, AuthFailError } = require("../core/error.response");
const db = require("../models");
const { findUserById } = require("../repositories/user.repo");
const AccessService = require("../services/access.service");

const permissionHandler = (permissions) =>
  asyncHandler(async (req, res, next) => {
    if (!permissions || isEmpty(permissions)) {
      throw new AuthFailError("Authorization failed!");
    }

    const userInfo = req.userInfo;

    // User should be pass authenticated first
    if (!userInfo || isEmpty(userInfo) || !userInfo.role) {
      throw new AuthFailError();
    }

    // Need to check again with user in db make sure role is correct

    const data = await findUserById(userInfo.id);
    const { dataValues: _user } = data;
    if (!_user) {
      throw new AuthFailError("User is not exists!");
    }

    console.log("current", _user);

    const currentRole = userInfo.role;
    console.log("req", currentRole);

    if (_user.role !== currentRole) {
      // Throw this error to request user sign in again
      throw new ErrorResponse("User's role is invalid!", 403, {
        errorCode: ErrorCode.RefreshTokenExpired,
      });
    }

    // if (!isArray(currentRole)) {
    //   throw new BadRequestError("User role invalid!");
    // }

    // STEP: Check current role exist in db

    next();
  });

module.exports = permissionHandler;

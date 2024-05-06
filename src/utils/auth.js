const JWT = require("jsonwebtoken");
const ENV = require("../configs/env");
const crypto = require("node:crypto");
const KeyTokenService = require("../services/keyToken.service");
const { ErrorResponse, AuthFailError } = require("../core/error.response");
const createTokenPair = ({ payload, privateKey }) => {
  const accessToken = JWT.sign(payload, ENV.JWT_SECRET, {
    expiresIn: 30,
  });
  const refreshToken = JWT.sign(payload, privateKey, {
    expiresIn: 60,
  });

  return { accessToken, refreshToken };
};

const generateToken = async (payload) => {
  const privateKey = crypto.randomBytes(64).toString("hex");

  const tokens = createTokenPair({
    payload,
    privateKey,
  });

  const keyStore = await KeyTokenService.createKeyToken({
    userId: payload.id,
    privateKey,
    refreshToken: tokens.refreshToken,
    publicKey: tokens.accessToken,
  });

  if (!keyStore) return null;

  return tokens;
};

module.exports = {
  generateToken,
  createTokenPair,
};

const jwt = require("jsonwebtoken");
const ENV = require("../configs/env");
const crypto = require("node:crypto");
const { getInitData } = require(".");
const KeyTokenService = require("../services/keyToken.service");

const createTokenPair = ({ payload, privateKey }) => {
  const accessToken = jwt.sign(payload, ENV.JWT_SECRET, {
    expiresIn: 30,
  });
  const refreshToken = jwt.sign(payload, privateKey, {
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

  console.log(keyStore);

  return tokens;
};

module.exports = {
  generateToken,
  createTokenPair,
};

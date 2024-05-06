const { BadRequestError } = require("../core/error.response");
const db = require("../models");

class KeyTokenService {
  static async createKeyToken({ userId, privateKey, refreshToken, publicKey }) {
    if (!userId) {
      throw new BadRequestError();
    }

    const [keyStore, created] = await db.KeyToken.findOrCreate({
      where: {
        userId,
      },
      defaults: {
        userId,
        privateKey: privateKey.toString(),
        refreshToken: refreshToken.toString(),
      },
    });

    if (!created) {
      return await keyStore.update({
        privateKey: privateKey.toString(),
        refreshToken: refreshToken.toString(),
      });
    }

    return keyStore;
  }

  static async getKeyTokenByUserId(userId) {
    if (!userId) {
      throw new BadRequestError();
    }

    const keyStore = await db.KeyToken.findOne({
      where: {
        userId,
      },
      attributes: ["id", "privateKey", "refreshToken"],
    });

    return keyStore?.dataValues;
  }
}

module.exports = KeyTokenService;

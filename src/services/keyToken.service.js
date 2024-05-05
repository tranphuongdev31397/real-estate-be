const db = require("../models");

class KeyTokenService {
  static async createKeyToken({ userId, privateKey, refreshToken, publicKey }) {
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

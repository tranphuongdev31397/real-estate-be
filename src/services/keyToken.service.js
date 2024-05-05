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
}

module.exports = KeyTokenService;

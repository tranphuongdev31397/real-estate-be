const { Op } = require("sequelize");
const {
  ConflictRequestError,
  AuthFailError,
} = require("../core/error.response");
const db = require("../models");
const bcrypt = require("bcrypt");
const { getInitData } = require("../utils");
const JWT = require("jsonwebtoken");
const ENV = require("../configs/env");
class AccessService {
  static async signUp({ phone, email, password }) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [userData, isSuccess] = await db.User.findOrCreate({
      where: {
        [Op.or]: {
          phone,
          email,
        },
      },
      defaults: {
        phone,
        email,
        password: hashedPassword,
      },
    });

    // const publicKey = crypto.getRandomValues(64).buffer();

    if (!isSuccess) {
      throw new ConflictRequestError(`User already exists`);
    }

    const initData = getInitData({
      object: userData,
      fields: ["id", "name", "email", "phone"],
    });

    return {
      user: initData,
      tokens: {
        accessToken: JWT.sign(initData, ENV.JWT_SECRET, {
          expiresIn: ENV.JWT_EXPIRES_IN,
        }),
        refreshToken: JWT.sign(initData, ENV.JWT_SECRET, {
          expiresIn: ENV.JWT_REFRESH_EXPIRES_IN,
        }),
      },
    };
  }

  static async signIn({ phone, email, password }) {
    const data = await db.User.findOne({
      where: {
        [Op.or]: {
          phone,
          email,
        },
      },
    });

    if (!data) {
      throw new AuthFailError("Password, phone or email is incorrect");
    }

    const { dataValues: userFound } = data;

    const comparePassword = await bcrypt.compare(password, userFound.password);

    if (!comparePassword) {
      throw new AuthFailError("Password, phone or email is incorrect");
    }

    const initData = getInitData({
      object: userFound,
      fields: ["id", "name", "email", "phone"],
    });

    return {
      user: initData,

      tokens: {
        accessToken: JWT.sign(initData, ENV.JWT_SECRET, {
          expiresIn: ENV.JWT_EXPIRES_IN,
        }),
        refreshToken: JWT.sign(initData, ENV.JWT_SECRET, {
          expiresIn: ENV.JWT_REFRESH_EXPIRES_IN,
        }),
      },
    };
  }
}

module.exports = AccessService;

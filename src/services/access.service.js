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
const { generateToken } = require("../utils/auth");
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

    const tokens = await generateToken(initData);

    return {
      user: initData,
      tokens,
    };
  }

  static async signIn({ phone, email, password }) {
    const data = await db.User.findOne({
      where: {
        [Op.or]: {
          phone: phone || null,
          email: email || null,
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

    const tokens = await generateToken(initData);

    return {
      user: initData,
      tokens,
    };
  }
}

module.exports = AccessService;

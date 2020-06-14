const jwt = require("jsonwebtoken");
const User = require("../models/User");
const HttpError = require("../helpers/HttpError");
const { compare } = require("../helpers/bcrypt");
const TokenManager = require("../helpers/TokenManager");
const config = require("../config");

class AuthController {
  static async register(req, res) {
    const { username, password } = req.body;

    const [{ "count(*)": count }] = await User.query()
      .where({ username })
      .count();

    const isUnique = count === 0;

    if (!isUnique) {
      throw new HttpError(
        `Account with username "${username}" already exist`,
        "Bad Request",
        "400"
      );
    }

    await User.query().insert({ username, password });

    res.status(201).end();
  }

  static async login(req, res) {
    const { username, password } = req.body;

    const user = await User.query().findOne({ username });

    if (!user || !compare(password, user.password)) {
      throw new HttpError(
        "Username or password is incorrect",
        "Forbidden",
        "403"
      );
    }

    const token = jwt.sign(
      {
        userId: user.id,
        username: user.username,
        timestamp: Date.now(),
      },
      config.jwt.secret,
      { expiresIn: config.jwt.expiresIn }
    );

    TokenManager.add(user.id, token);

    res.send({
      token,
    });
  }

  static async logout(req, res) {
    const { token } = req;

    TokenManager.remove(token);

    res.status(200).end();
  }
}

module.exports = AuthController;

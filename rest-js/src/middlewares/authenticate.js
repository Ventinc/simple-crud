const jwt = require("jsonwebtoken");
const asyncHandler = require("../helpers/asyncHandler");
const config = require("../config");
const TokenManager = require("../helpers/TokenManager");
const HttpError = require("../helpers/HttpError");
const User = require("../models/User");

function getTokenFromHeader(req) {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    return req.headers.authorization.split(" ")[1];
  }
  return null;
}

async function authenticate(req, _, next) {
  const token = getTokenFromHeader(req);

  try {
    const decoded = jwt.verify(token, config.jwt.secret);

    if (!TokenManager.isValid(token)) {
      throw new Error();
    }

    //Keep the token if needed later (ex: logout)
    req.token = token;
    req.user = await User.query().findById(decoded.userId);

    next();
  } catch (err) {
    next(new HttpError("Unauthorized", "Unauthorized", 401));
  }
}

module.exports = authenticate;

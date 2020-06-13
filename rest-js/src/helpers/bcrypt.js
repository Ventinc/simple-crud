const bcrypt = require("bcryptjs");
const config = require("../config");

function hash(value) {
  return bcrypt.hashSync(value, config.saltRounds);
}

function compare(value, hashValue) {
  return bcrypt.compareSync(value, hashValue);
}

module.exports = {
  hash,
  compare,
};

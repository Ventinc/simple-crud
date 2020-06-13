const dotenv = require("dotenv");
const database = require("./database");

dotenv.config();

const config = {
  port: process.env.PORT || 3000,
  env: process.env.NODE_ENV || "development",
  db: database,
};

module.exports = config;

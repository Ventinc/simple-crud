const path = require("path");

const directory = path.join(__dirname, "../migrations");
const sqliteDirectory = path.join(__dirname, "../..");

module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: `${sqliteDirectory}/dev.sqlite3`,
    },
    migrations: {
      directory,
    },
    useNullAsDefault: false,
  },

  production: {
    client: "sqlite3",
    connection: {
      filename: `${sqliteDirectory}/dev.sqlite3`,
    },
    migrations: {
      directory,
    },
    useNullAsDefault: false,
  },
};

// Update with your config settings.

const directory = "../migrations";

module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "../../dev.sqlite3",
    },
    migrations: {
      directory,
    },
    useNullAsDefault: false,
  },

  production: {
    client: "sqlite3",
    connection: {
      filename: "../../dev.sqlite3",
    },
    migrations: {
      directory,
    },
    useNullAsDefault: false,
  },
};

const express = require("express");
const pinoHttp = require("pino-http");
const pino = require("pino");
const knexConnect = require("knex");
const config = require("./config");
const router = require("./config/routes");
const { Model } = require("objection");

function startServer() {
  const app = express(); // Initialize express
  // Initialize logger
  const logger = pino({
    prettyPrint: config.env !== "production" ? true : false,
  });

  const knex = knexConnect(config.db[config.env]); // Initialize database connection

  Model.knex(knex); // Bind knex to all objection models

  app.use(pinoHttp({ logger })); // Application middleware

  router(app); // Setting up router

  // Launch api
  app.listen(config.port, () => {
    logger.info(`Server start at localhost:${config.port}`);
  });
}

module.exports = startServer;

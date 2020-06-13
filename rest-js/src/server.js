const express = require("express");
const pinoHttp = require("pino-http");
const pino = require("pino");
const bodyParser = require("body-parser");
const { Model } = require("objection");
const knexConnect = require("knex");
const config = require("./config");
const router = require("./config/routes");
const trimmerBody = require("./middlewares/trimmerBody");

function startServer() {
  const app = express(); // Initialize express
  // Initialize logger
  const logger = pino({
    prettyPrint: config.env !== "production" ? true : false,
  });

  const knex = knexConnect(config.db[config.env]); // Initialize database connection

  Model.knex(knex); // Bind knex to all objection models

  // Application middleware
  app.use(pinoHttp({ logger }));
  app.use(bodyParser());
  app.use(trimmerBody);

  app.use(router); // Setting up router

  // Launch api
  app.listen(config.port, () => {
    logger.info(`Server start at localhost:${config.port}`);
  });
}

module.exports = startServer;

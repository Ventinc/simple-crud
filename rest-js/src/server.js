const express = require("express");
const config = require("./config");
const pinoHttp = require("pino-http");
const pino = require("pino");
const routes = require("./config/routes");

function startServer() {
  const app = express();
  const logger = pino({
    prettyPrint: config.env !== "production" ? true : false,
  });

  app.use(pinoHttp({ logger }));

  routes(app);

  app.listen(config.port, () => {
    logger.info(`Server start at localhost:${config.port}`);
  });
}

module.exports = startServer;

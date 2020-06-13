function routes(app) {
  app.get("/", (_, res) => res.send({ hello: "world" }));
}

module.exports = routes;

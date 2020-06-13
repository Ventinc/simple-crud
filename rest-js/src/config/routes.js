function router(app) {
  app.get("/", (_, res) => res.send({ hello: "world" }));
}

module.exports = router;

const AuthController = require("../controllers/AuthController");
const HttpError = require("../helpers/HttpError");
const { createUser, loginUser } = require("../schemas/user");
const validateSchema = require("../middlewares/validateSchema");
const asyncHandler = require("../helpers/asyncHandler");
const { Router } = require("express");
const authenticate = require("../middlewares/authenticate");

const router = Router();

router.get("/", (_, res) => res.send({ hello: "world" }));
router.post(
  "/auth/register",
  validateSchema.body(createUser),
  asyncHandler(AuthController.register)
);

router.post(
  "/auth/login",
  validateSchema.body(loginUser),
  asyncHandler(AuthController.login)
);

router.post("/auth/logout", authenticate, asyncHandler(AuthController.logout));

router.get("/authenticate", authenticate, (_, res) =>
  res.send({ hello: "world" })
);

// Manage error 404 (No routes found => 404)
router.use((req, res, next) => {
  const err = new HttpError("Not Found", "Not Found", 404);
  next(err);
});

// Handle error
router.use((err, req, res, next) => {
  req.log.error(err);

  if (!(err instanceof HttpError)) {
    res.status(500);
    res.json({ error: true });
  }

  res.status(err.status);
  res.json(err.response);
});

module.exports = router;

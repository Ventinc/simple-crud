const HttpError = require("../helpers/HttpError");

function body(schema) {
  return async (req, res, next) => {
    try {
      await schema.validate(req.body, {
        abortEarly: false,
        strict: true,
        stripUnknown: true,
        recursive: true,
      });

      next();
    } catch (err) {
      next(new HttpError(err.errors, err.name, 400));
    }
  };
}

function query(schema) {
  return async (req, res, next) => {
    try {
      req.query = schema.cast(req.query);

      await schema.validate(req.query, {
        abortEarly: false,
        strict: true,
        stripUnknown: true,
        recursive: true,
      });

      next();
    } catch (err) {
      next(new HttpError(err.errors, err.name, 400));
    }
  };
}

module.exports = {
  body,
  query,
};

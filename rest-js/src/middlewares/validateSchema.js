const HttpError = require("../helpers/HttpError");

function body(schema) {
  return async (req, res, next) => {
    try {
      const validation = await schema.validate(req.body, {
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
};

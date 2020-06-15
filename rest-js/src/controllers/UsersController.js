const User = require("../models/User");

class UsersController {
  static async index(req, res) {
    const { page, perPage } = req.query;

    const result = await User.query()
      .select(
        "users.id",
        "users.username",
        User.relatedQuery("posts").count().as("numberOfPosts")
      )
      .page(page - 1, perPage);

    res.send({ ...result, page, perPage });
  }

  static async show(req, res) {
    const user = await UsersController.getById(req.params.id);

    res.send(user);
  }

  static async getById(id) {
    const user = await User.query()
      .select(
        "users.id",
        "users.username",
        User.relatedQuery("posts").count().as("numberOfPosts")
      )
      .findById(id);

    if (!user) {
      throw new HttpError("Not found", "Not Found", 404);
    }

    return user;
  }
}

module.exports = UsersController;

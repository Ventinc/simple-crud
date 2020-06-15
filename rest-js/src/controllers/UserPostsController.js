const UsersController = require("./UsersController");
const Post = require("../models/Post");

class UserPostsController {
  static async index(req, res) {
    const { page, perPage } = req.query;

    const user = await UsersController.getById(req.params.id);

    const result = await Post.query()
      .where({ userId: user.id })
      .page(page, perPage);

    res.send({ ...result, page, perPage });
  }
}

module.exports = UserPostsController;

const Post = require("../models/Post");
const HttpError = require("../helpers/HttpError");

class PostsController {
  static async index(req, res) {
    const { page, perPage } = req.query;

    const posts = await Post.query()
      .select(
        "posts.id",
        "posts.title",
        "posts.content",
        "posts.created_at as createdAt",
        "posts.updated_at as updatedAt",
        "author.username as authorUsername",
        "author.id as authorId"
      )
      .joinRelated("author")
      .offset((page - 1) * perPage)
      .limit(perPage);

    res.send({ posts });
  }

  static async show(req, res) {
    const post = await Post.query()
      .select(
        "posts.id",
        "posts.title",
        "posts.content",
        "posts.created_at as createdAt",
        "posts.updated_at as updatedAt",
        "author.username as authorUsername",
        "author.id as authorId"
      )
      .joinRelated("author")
      .findById(req.params.id);

    if (!post) {
      throw new HttpError("Not found", "Not Found", 404);
    }

    res.send(post);
  }
}

module.exports = PostsController;

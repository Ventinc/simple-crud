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
    const post = await PostsController.getById(req.params.id);

    res.send(post);
  }

  static async create(req, res) {
    const {
      user,
      body: { title, content },
    } = req;

    const post = await Post.query().insert({ title, content, userId: user.id });

    res.status(201).send(post);
  }

  static async update(req, res) {
    const { user } = req;

    const post = await PostsController.getById(req.params.id);

    if (post.authorId !== user.id) {
      throw new HttpError(
        "Can't modify a post that is not yours",
        "Forbidden",
        403
      );
    }

    await post.$query().update(req.body);

    res.send(post);
  }

  static async delete(req, res) {
    const { user } = req;

    const post = await PostsController.getById(req.params.id);

    if (post.authorId !== user.id) {
      throw new HttpError(
        "Can't delete a post that is not yours",
        "Forbidden",
        403
      );
    }

    await post.$query().delete();

    res.status(404).end();
  }

  static async getById(id) {
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
      .findById(id);

    if (!post) {
      throw new HttpError("Not found", "Not Found", 404);
    }

    return post;
  }
}

module.exports = PostsController;

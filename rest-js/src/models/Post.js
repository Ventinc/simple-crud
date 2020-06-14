const { Model } = require("objection");
const User = require("./User");

class Post extends Model {
  static get tableName() {
    return "posts";
  }

  static relationMappings = {
    author: {
      relation: Model.HasManyRelation,
      modelClass: User,
      join: {
        from: "posts.userId",
        to: "users.id",
      },
    },
  };
}

module.exports = Post;

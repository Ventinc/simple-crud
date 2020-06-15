const { Model } = require("objection");

class Post extends Model {
  static get tableName() {
    return "posts";
  }

  $beforeInsert() {
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }

  $beforeUpdate() {
    this.updatedAt = new Date().toISOString();
  }

  static get relationMappings() {
    const User = require("./User");

    return {
      author: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "posts.userId",
          to: "users.id",
        },
      },
    };
  }
}

module.exports = Post;

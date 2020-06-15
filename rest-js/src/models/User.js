const { Model } = require("objection");
const { hash } = require("../helpers/bcrypt");

class User extends Model {
  static get tableName() {
    return "users";
  }

  $beforeInsert(context) {
    if (this.password) {
      this.password = hash(this.password);
    }
  }

  static get relationMappings() {
    const Post = require("./Post");

    return {
      posts: {
        relation: Model.HasManyRelation,
        modelClass: Post,
        join: {
          from: "users.id",
          to: "posts.userId",
        },
      },
    };
  }
}

module.exports = User;

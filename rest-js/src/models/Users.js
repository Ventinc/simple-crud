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
}

module.exports = User;

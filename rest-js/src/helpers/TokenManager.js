// Manage token validity in memory
class TokenManager {
  constructor() {
    this.tokens = {};
  }

  add(key, token) {
    if (this.tokens[key]) {
      this.tokens[key].push(token);
    } else {
      this.tokens[key] = [token];
    }
  }

  get(key) {
    return this.tokens[key];
  }

  isValid(token) {
    for (const value of Object.values(this.tokens)) {
      if (value.includes(token)) {
        return true;
      }
    }

    return false;
  }

  remove(token) {
    for (const [key, value] of Object.entries(this.tokens)) {
      const index = value.findIndex((value) => value === token);
      if (index !== -1) {
        this.tokens[key].splice(index, 1);

        if (this.tokens[key].length === 0) {
          delete this.tokens[key];
        }
      }
    }
  }
}

module.exports = new TokenManager();

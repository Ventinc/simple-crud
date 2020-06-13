class HttpError extends Error {
  constructor(content, error, status) {
    super(error);
    this.error = error;
    this.status = status;
    this.content = content;
    this.response = {
      error: error,
      content,
    };
  }
}

module.exports = HttpError;

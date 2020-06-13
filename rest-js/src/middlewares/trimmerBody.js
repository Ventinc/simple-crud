function trimStringProperties(data) {
  if (data !== null && typeof data === "object") {
    for (const [key, value] of Object.entries(data)) {
      if (typeof value === "object") {
        data[key] = trimStringProperties(value);
      } else if (typeof value === "string") {
        data[key] = value.trim();
      }
    }
  }
}

function trimmerBody(req, _, next) {
  if (req.body) {
    trimStringProperties(req.body);
  }
  next();
}

module.exports = trimmerBody;

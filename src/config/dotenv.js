const dotenv = require("dotenv");

dotenv.config({
  path: (function() {
    switch (process.env.NODE_ENV) {
      case "test":
        return ".env.test";
      case "development":
        return ".env.dev";
      case "production":
        return ".env";
      default:
        ".env";
    }
  })()
});

const resolveDotenv = () => {};

module.exports = {
  mongoDBUri: process.env.MONGO_DB_URI,
  saltKey: process.env.SALT_KEY
};

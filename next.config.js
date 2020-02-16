require("dotenv").config();

module.exports = {
  poweredByHeader: false,
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
    SESSION_SECRET: process.env.SESSION_SECRET
  }
};

require("dotenv").config();

module.exports = {
  poweredByHeader: false,
  env: {
    MONGODB_URI: process.env.MONGODB_URI
  }
};

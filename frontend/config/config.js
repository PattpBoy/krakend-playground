"use strict";
const dotEnv = require("dotenv");
dotEnv.config();

const authConfig = {
  "domain": process.env.AUTH0_DOMAIN || null,
  "clientId": process.env.AUTH0_CLIENT_ID || null,
  "audience": process.env.AUTH0_AUDIENCE || null
};

module.exports = { authConfig };

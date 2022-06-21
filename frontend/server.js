"use strict";
const express = require('express');
const morgan = require("morgan");
const helmet = require("helmet");
const jwt = require('express-jwt');
const jwtAuthz = require('express-jwt-authz');
const jwksRsa = require('jwks-rsa');
const { join } = require("path");
const cors = require('cors');
const authConfig = require("./config/config");
require('dotenv').config();

const app = express();

if (!authConfig.domain || !authConfig.audience) {
  throw "Please make sure that all environment variables is in place and populated";
}

app.use(cors());
app.use(morgan("dev"));
app.use(helmet());
app.use(express.static(join(__dirname, "public")));

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${authConfig.domain}/.well-known/jwks.json`
  }),

  audience: authConfig.audience,
  issuer: `https://${authConfig.domain}/`,
  algorithms: ['RS256']
});

const checkScopes = jwtAuthz([ 'read:messages' ]);

app.get('/api/public', function(req, res) {
  res.json({ message: "Hello from a public endpoint! You don't need to be authenticated to see this." });
});

app.get('/api/private', checkJwt, checkScopes, function(req, res) {
  res.json({ message: "Hello from a private endpoint! You need to be authenticated and have a scope of read:messages to see this." });
});

app.get("/api/auth/config", (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.json({
    domain: authConfig.domain,
    clientId: authConfig.clientId,
    audience: authConfig.audience
  })
});

app.get("/*", (req, res) => {
  res.sendFile(join(__dirname, 'public', 'index.html'));
});

app.use(function(err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    return res.status(401).send({ msg: "Invalid token" });
  }

  next(err, req, res);
});

process.on("SIGINT", function() {
  process.exit();
});

module.exports = app;

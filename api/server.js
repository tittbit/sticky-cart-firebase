const { createRequestHandler } = require("@remix-run/node");
const build = require("../build/index.js");

module.exports = createRequestHandler({ build, mode: process.env.NODE_ENV });

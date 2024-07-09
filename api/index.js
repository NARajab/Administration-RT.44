const { default: serverless } = require("serverless-http");
const app = require("../app/index");

module.exports.handler = serverless(app);
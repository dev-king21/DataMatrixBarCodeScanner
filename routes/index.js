const express = require("express");
const passport = require("passport");
const apiRoutes = require("./api");
const webRoutes = require("./web");

module.exports = function (app) {
  const routes = express.Router();

  routes.use("/api", apiRoutes());
  routes.use("/", webRoutes());

  app.use("/", routes);
};

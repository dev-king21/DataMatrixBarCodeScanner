const express = require("express");
const AppController = require("../controller/app");

module.exports = function () {
  const router = express.Router();

  router.all("*", AppController.errApi);

  return router;
};

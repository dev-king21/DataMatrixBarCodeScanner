const express = require("express");
const AppController = require("../controller/app");

module.exports = function () {
  const router = express.Router();

  router.get("/", AppController.index);
  router.get("/admin", AppController.admin);

  router.get("*", AppController.index);

  return router;
};

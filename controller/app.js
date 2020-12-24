var path = require("path");

exports.index = function (req, res) {
  const view = path.join(__DIR, "../resources/build", "index.html");
  return res.status(200).sendFile(view);
};

exports.admin = function (req, res) {
  const view = path.join(__DIR, "../resources/build", "index.html");
  return res.status(200).sendFile(view);
};

exports.errApi = function (req, res) {
  return res.status(200).json({
    error: "unknown api",
  });
};
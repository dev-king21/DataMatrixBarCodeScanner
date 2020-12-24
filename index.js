const express = require("express"),
  bodyParser = require("body-parser"),
  logger = require("morgan"),
  path = require("path"),
  mongoose = require("mongoose"),
  cors = require("cors"),
  router = require("./routes"),
  socketServer = require("./socketServer"),
  config = require("./config"),
  https = require('https'),
  fs = require('fs');
  
const options = {
  key: fs.readFileSync('./cert/key.pem'),
  cert: fs.readFileSync('./cert/cert.pem')
};

const app = express();
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

const server = https.createServer(options, app);

app.use(bodyParser.json());
app.use(logger("dev"));
app.use(express.static(path.join(__dirname, '/resources/build')));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials"
  );
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

router(app);


if (process.env.NODE_ENV != config.test_env) {
  server.listen(config.port);
  console.log(`Your server is running on port ${config.port}.`);
} else {
  server = app.listen(config.test_port);
}

const io = require("socket.io").listen(server);
socketServer(io);

module.exports = server;
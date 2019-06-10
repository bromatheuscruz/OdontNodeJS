const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(
  bodyParser.json({
    limit: "10mb"
  })
);

app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, x-access-token"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

const userRoute = require("../routes/user-route");

app.use("api/rest/user", userRoute);

module.exports = app;

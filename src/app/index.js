const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

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

// connect to mongodb
mongoose.connect("mongodb://localhost:27017/odont_db");

// load schemas
const userSchema = require("../db/schemas/user-schema");

// load routes
const userRoute = require("../routes/user-route");
const pageRoute = require("../routes/pages-route");

app.use("/api/rest/user", userRoute);
app.use("/pages", pageRoute);

module.exports = app;

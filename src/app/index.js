const config = require("../../config");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const envJson = require("../../env.json");
const currentEnv = process.env.NODE_ENV || "development";
const envConfiguration = envJson[currentEnv];

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
mongoose.connect(envConfiguration.mongo_db, {
  useNewUrlParser: true
});

// load schemas
const userSchema = require("../db/schemas/user-schema");

// load routes
const userRoute = require("../routes/user-route");
const pageRoute = require("../routes/pages-route");
const authRoute = require("../routes/auth-route");

app.use("/api/rest", userRoute);
app.use("/pages", pageRoute);
app.use("/api/rest", authRoute)

module.exports = app;

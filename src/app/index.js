require("../config");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const envJson = require("../../env.json");
const currentEnv = process.env.NODE_ENV;
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

require("../db/schemas");

const userRoute = require("../routes/user-route");
const pageRoute = require("../routes/pages-route");
const authRoute = require("../routes/auth-route");
const pacientRoute = require("../routes/pacient-route");
const doctorRoute = require("../routes/doctor-route");
const consultationMarkedRoute = require("../routes/consultation-marked-route");

app.use("/api/rest/users", userRoute);
app.use("/api/rest/auth", authRoute);
app.use("/api/rest/pacients", pacientRoute);
app.use("/api/rest/doctors", doctorRoute);
app.use("/api/rest/consultation-markeds", consultationMarkedRoute);
app.use("/pages", pageRoute);

module.exports = app;

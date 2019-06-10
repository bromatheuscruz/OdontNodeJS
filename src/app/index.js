const express = require("express");
const app = express();
const userRoute = require("../routes/user-route");

app.use("/user", userRoute);

module.exports = app;

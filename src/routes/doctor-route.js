const express = require("express");
const router = express.Router();
const controller = require("../controllers/doctor-controller");

router.post("/", controller.create);

module.exports = router;
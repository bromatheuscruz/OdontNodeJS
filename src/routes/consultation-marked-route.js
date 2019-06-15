const express = require("express");
const router = express.Router();
const controller = require("../controllers/consultation-marked-controller");

router.post("/", controller.create);
router.get("/", controller.getAll);
router.get("/pacients/:id/consultation-markeds", controller.getByPacientId);

module.exports = router;

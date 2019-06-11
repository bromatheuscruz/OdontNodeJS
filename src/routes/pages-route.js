const express = require("express");
const router = express.Router();

router.get("/confirm_register/:id", (req, res, next) => {
    const id = req.params.id;
    res.sendFile(__dirname + "/pages/confirm-account-page.html");
});

module.exports = router;
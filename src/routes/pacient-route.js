const express = require("express");
const router = express.Router();

router.post("/", (req, res, next) => {
    res
        .status(201)
        .send({
            "pacientCreated": "true"
        });
});

module.exports = router;
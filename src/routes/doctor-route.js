const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
    res
        .status(201)
        .send({
            "doctorCreated": "true"
        });
});

module.exports = router;
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Pacient = new Schema({
    name: {
        type: String,
        required: true
    },
    document: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Pacient", Pacient);
const mongoose = require("mongoose");
const Schema = mongoose.Schema

const ConsultantMarked = new Schema({
    day: {
        type: Date,
        required: true
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor"
    },
    pacient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Pacient"
    },
    description: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ["MAINTENANCE", "EVALUATION"]
    }
});

module.exports = mongoose.model("ConsultationMarked", ConsultantMarked);


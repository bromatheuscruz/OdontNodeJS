const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Doctor = new Schema({
    name: {
        type: String,
        required: true
    },
    document: {
        type: String,
        required: true
    },
    daysOfService: [
        {
            type: String,
            enum: [
                "SUNDAY",
                "MONDAY",
                "TUESDAY",
                "WEDNESDAY",
                "THURSDAY",
                "FRIDAY",
                "SATURDAY"
            ]
        }
    ]
});

module.exports = mongoose.model("Doctor", Doctor);
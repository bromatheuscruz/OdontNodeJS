const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const User = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    roles: [
        {
            type: String,
            required: true,
            enum: ["USER", "ADMIN", "EMPLOYEE"],
            default: "USER"
        }
    ]
}, {
        timestamps: true
    });

module.exports = mongoose.model("User", User);
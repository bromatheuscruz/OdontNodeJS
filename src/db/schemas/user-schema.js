const mongoose = require('mongoose');

const schema = mongoose.Schema;

const User = new schema({
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

module.exports = mongoose.model('User', User);
const mongoose = require('mongoose');

const schema = mongoose.Schema;

const User = new schema({
    name: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: false
    },
    age: {
        type: Number,
    },
    generatedKey: {
        type: String,
        required: true,
        unique: true
    }
}, {
        timestamps: true
    });

module.exports = mongoose.model('User', User);
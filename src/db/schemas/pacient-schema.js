const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Pacient = new Schema({
    name: {
        type: String,
        required: true
    },
    indication: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pacient'
    },
    momName: {
        type: String,
    },
    address: {
        type: {
            district: {
                type: String,
                required: true
            },
            city: {
                type: String,
                required: true
            },
            state: {
                type: String,
                required: true
            },
            CEP: {
                type: String,
                required: true
            }
        }
    },
    rg: {
        type: String,
        required: true
    },
    cpf: {
        type: String,
        required: true
    },
    phones: [
        {
            type: String
        }
    ],
    email: {
        type: String,
        required: true
    },
    birthday: {
        type: Date
    },
    observation: {
        type: String
    }
});

module.exports = mongoose.model("Pacient", Pacient);
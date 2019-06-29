const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Pacient = new Schema({
  name: {
    type: String,
    required: true
  },
  responsibleName: {
    type: String
  },
  address: {
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
      required: true,
      uppercase: true
    },
    cep: {
      type: String,
      required: true
    },
    publicPlace: {
        type: String,
        required: true
    }
  },
  rg: {
    type: String,
    required: true,
    unique: true
  },
  cpf: {
    type: String,
    required: true,
    unique: true
  },
  phones: [
    {
      type: String,
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

const mongoose = require("mongoose");
const Pacient = mongoose.model("Pacient");

exports.create = async data => {
    const pacient = new Pacient(data);
    await pacient.save();
}

exports.getAll = async () => {
    const allPacients = await Pacient.find({});
    return allPacients;
}
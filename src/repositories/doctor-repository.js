const mongoose = require("mongoose");
const Doctor = mongoose.model("Doctor");

exports.create = async data => {
    const doctor = new Doctor(data);
    await doctor.save();
}
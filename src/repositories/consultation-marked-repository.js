const mongoose = require("mongoose");
const ConsultationMarked = mongoose.model("ConsultationMarked");

exports.create = async data => {
    const consultationMarked = new ConsultationMarked(data);
    await consultationMarked.save();
}
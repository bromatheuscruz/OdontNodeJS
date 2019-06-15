const mongoose = require("mongoose");
const ConsultationMarked = mongoose.model("ConsultationMarked");

exports.create = async data => {
  const consultationMarked = new ConsultationMarked(data);
  await consultationMarked.save();
};

exports.getAll = async () => {
  const allConsultationMarkeds = await ConsultationMarked.find({});
  return allConsultationMarkeds;
};

exports.getByPacientId = async id => {
  const consultationMarkeds = await ConsultationMarked.find({
    pacient: id
  });
  return consultationMarkeds;
};

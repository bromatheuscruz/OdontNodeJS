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
  const consultationMarkeds = await ConsultationMarked.aggregate([
    {
      $match: {
        pacient: new mongoose.Types.ObjectId(id)
      }
    },
    {
      $lookup: {
        from: "doctors",
        localField: "doctor",
        foreignField: "_id",
        as: "doctor"
      }
    },
    {
      $lookup: {
        from: "pacients",
        localField: "pacient",
        foreignField: "_id",
        as: "pacient"
      }
    }
  ]);

  return consultationMarkeds;
};

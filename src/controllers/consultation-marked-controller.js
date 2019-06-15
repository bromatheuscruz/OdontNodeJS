const repository = require("../repositories/consultation-marked-repository");
const moment = require("moment");

exports.create = async (req, res) => {
  const { consultationMarked } = req.body;
  try {
    await repository.create(consultationMarked);
    res.status(201).send();
  } catch (err) {
    res.status(401).send({
      success: false,
      message: "Consultantion marked not created",
      error: err
    });
  }
};

exports.getAll = async (req, res, next) => {
  try {
    const allConsultationMarkeds = await repository.getAll();
    res.status(200).send({
      success: true,
      message: "Success",
      data: allConsultationMarkeds
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: "Error while getting all consultation markeds",
      error: err
    });
  }
};

exports.getByPacientId = async (req, res, next) => {
  const { id } = req.params;

  try {
    let consultationMarkeds = await repository.getByPacientId(id);
    consultationMarkeds = consultationMarkeds.map(
      mapConsultationMarkedResponse
    );
    res.status(200).send({
      success: true,
      message: "Success",
      data: consultationMarkeds
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: "Error while getting all consultation markeds from pacient",
      error: err
    });
  }
};

const mapConsultationMarkedResponse = c => ({
  id: c._id,
  day: moment(c.day).format("DD/MM/YYYY"),
  hour: moment(c.day).format("hh:mm:ss A"),
  doctor: c.doctor,
  pacient: c.pacient,
  description: c.description,
  type: c.type
});

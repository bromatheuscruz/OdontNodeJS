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
      consultationMarkeds: allConsultationMarkeds
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
    const consultationMarkeds = await repository.getByPacientId(id);
    res.status(200).send({
      success: true,
      message: "Success",
      data: consultationMarkeds.map(consultationMarked => {
        return {
          ...consultationMarked,
          id: consultationMarked._id,
          hour: moment(consultationMarked.day).format("hh:mm:ss"),
          day: moment(consultationMarked.day).format("dd/mm/yyyy")
        };
      })
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: "Error while getting all consultation markeds from pacient",
      error: err
    });
  }
};

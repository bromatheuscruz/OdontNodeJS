const repository = require("../repositories/doctor-repository");

exports.create = async (req, res, next) => {
  const { doctor } = req.body;

  try {
    await repository.create(doctor);
    res.status(201).send();
  } catch (err) {
    res.status(401).send({
      success: false,
      message: "Doctor not created",
      error: err
    });
  }
};

exports.getAll = async (req, res, next) => {
  try {
    const allDoctors = await repository.getAll();
    res.status(200).send({
      success: true,
      message: "Success",
      data: allDoctors
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: "Error while getting all doctors",
      error: err
    });
  }
};

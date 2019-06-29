const repository = require("../repositories/pacient-repository");

exports.create = async (req, res, next) => {
  const { pacient } = req.body;
  try {
    const existentPacient = await repository.findByDocuments({ rg: pacient.rg, cpf: pacient.cpf });
    
    if (existentPacient) {
      res.status(403).send({
        success: false,
        message: "Documento já cadastrado. (CPF ou RG)"
      });
    }

    await repository.create(pacient);
    res.status(201).send({
      success: true,
      message: "Pacient created"
    });
  } catch (err) {
    res.status(201).send({
      success: false,
      message: "Pacient not created",
      error: err
    });
  }
};

exports.getAll = async (req, res, next) => {
  try {
    const allPacients = await repository.getAll();
    res.status(200).send({
      success: true,
      message: "Success",
      data: allPacients
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: "Error while getting all pacients",
      error: err
    });
  }
};

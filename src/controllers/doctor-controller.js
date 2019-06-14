const repository = require("../repositories/doctor-repository");

exports.create = async (req, res, next) => {
    const { doctor } = req.body;

    try {
        await repository.create(doctor);
        res.status(201);
    } catch (err) {
        res.status(401).send({
            success: false,
            message: "Doctor not created",
            error: err
        });
    }
}
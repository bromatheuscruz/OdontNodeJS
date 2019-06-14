const repository = require("../repositories/pacient-repository");

exports.create = async (req, res, next) => {
    const { pacient } = req.body;

    try {
        await repository.create(pacient);
        res.status(201).send();
    } catch (err) {
        res
            .status(201)
            .send({
                success: false,
                message: "Pacient not created",
                error: err
            });
    }
}

exports.getAll = async (req, res, next) => {
    try {
        const allPacients = await repository.getAll();
        res.status(200).send({
            success: true,
            message: "Success",
            pacients: allPacients
        });
    } catch (err) {
        res.status(500).send({
            success: false,
            message: "Error while getting all pacients",
            error: err
        });
    }
};
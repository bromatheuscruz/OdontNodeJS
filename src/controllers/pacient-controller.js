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
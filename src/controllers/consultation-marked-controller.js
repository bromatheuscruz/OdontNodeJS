const repository = require("../repositories/consultation-marked-repository");

exports.create = async (req, res) => {
    const { consultationMarked } = req.body;
    try {
        await repository.create(consultationMarked);
        res.status(201).send();
    } catch (err) {
        res
            .status(401)
            .send({
                success: false,
                message: "Consultantion marked not created",
                error: err
            });
    }
}
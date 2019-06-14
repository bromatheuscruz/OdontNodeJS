const repository = require("../repositories/consultation-marked-repository");

exports.create = async (req, res) => {
    const { consultantMarked } = req.body;
    try {
        await repository.create(consultantMarked);
        res.status(201);
    } catch (err) {
        res
            .status(401)
            .send({
                success: false,
                message: "Consultant marked not created",
                error: err
            });
    }
}
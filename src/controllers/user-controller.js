const repository    = require("../repositories/user-repository");
const validator     = require("../validators/contract-validator");
const encryptService = require("../services/encrypt-service");

exports.create = async (req, res, next) => {

    const newUser = req.body;

    validator.isEmail(newUser.email, "Invalid email");
    validator.hasMinLen(newUser.password, 6, "Password is required");

    if (!validator.isValid()) {
        res.status(403).send({
            success: false,
            error: "New user is invalid",
            errors: validator.errors()
        });
    }

    try {

        const encryptPassoword = encryptService.encrypt(newUser.password);

        await repository.create({
            email: newUser.email,
            password: encryptPassoword
        });

        res.status(201).send();

    } catch (err) {
        console.log(err);
        res.status(500).send({
            success: false,
            errors: err
        });
    }
}
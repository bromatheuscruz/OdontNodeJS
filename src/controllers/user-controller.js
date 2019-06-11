const repository = require("../repositories/user-repository");
const validator = require("../validators/contract-validator");
const emailService = require("../services/email-service");
const uuid = require("uuid");

exports.create = async (req, res, next) => {

    const newUser = req.body;

    validator.isEmail(newUser.email, "Invalid email");
    validator.isRequired(newUser.name, "Name is required");
    validator.isRequired(newUser.firstName, "Firstname is required");
    validator.isRequired(newUser.lastName, "Lastname is required");
    validator.hasMinLen(newUser.password, 6, "Password is required");
    validator.isRequired(newUser.age, "Age is required");

    if (!validator.isValid()) {
        res.status(403).send({
            success: false,
            error: "New user is invalid",
            errors: validator.errors()
        });
    }

    try {
        const generatedKey = uuid();
        newUser.generatedKey = generatedKey;
        await repository.create(newUser);
        await emailService.sendEmail(newUser);

        res.status(201).send({
            success: true,
            data: newUser
        });

    } catch (err) {
        console.log(err);
        res.status(500).send({
            success: false,
            errors: err
        });
    }
}
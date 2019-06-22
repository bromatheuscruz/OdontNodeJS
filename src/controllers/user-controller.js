const repository = require("../repositories/user-repository");
const Validator = require("../validators/contract-validator");
const encryptService = require("../services/encrypt-service");

exports.create = async (req, res, next) => {
  const newUser = req.body;
  const validator = new Validator();

  validator.isRequired(newUser.email, "Email is required");
  validator.isRequired(newUser.password, "Password is required");
  validator.isEmail(newUser.email, "Invalid email");
  validator.hasMinLen(
    newUser.password,
    6,
    "Password must contain at least six characters"
  );

  if (!validator.isValid()) {
    return res.status(403).send({
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
    res.status(500).send({
      success: false,
      errors: err
    });
  }
};

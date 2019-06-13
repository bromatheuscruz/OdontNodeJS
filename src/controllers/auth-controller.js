const encryptService = require("../services/encrypt-service");
const userRepository = require("../repositories/user-repository");
const jwtService = require("../services/jwt-service");

exports.login = async (req, res, next) => {
    const { email, password } = req.body;
    const encryptPassword = encryptService.encrypt(password);

    const user = await userRepository.findByCredentials({ email, password: encryptPassword });

    if (user) {
        const token = await jwtService.generateToken(user);
        res
            .status(200)
            .send({
                success: true,
                message: "Successfully logged in",
                data: {
                    token: `Bearer ${token}`,
                    user: {
                        id: user._id,
                        email: user.email,
                    }
                }
            });
    } else {
        res
            .status(401)
            .send({
                success: false,
                data: {},
                message: "Unauthenticated"
            });
    }
}
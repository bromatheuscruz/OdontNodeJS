const jwtService = require("../services/jwt-service");

exports.authorize = (req, res, next) => {
    const token = extractFromRequest(req);

    if (!token) {
        res.status(401).json({
            message: "Acesso restrito"
        });
    } else {
        jwtService.verify(token, (error, decoded) => {
            if (error) {
                res.status(401).json({
                    message: "Token inválido"
                });
            } else {
                next();
            }
        });
    }
};

const extractFromRequest = (req) => {
    let token = req.body.token || req.query.token || req.headers["x-access-token"];
    return token;
}
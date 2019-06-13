const jwt = require("jsonwebtoken");

exports.verify = (token, callback) => {
    jwt.verify(token, global.SALT_KEY, callback);
}

exports.generateToken = async data => {
    const token = await jwt.sign(data, global.SALT_KEY, { expiresIn: "1d" });
    return token;
};

exports.decodeToken = async token => {
    let data = await jwt.verify(token, global.SALT_KEY);
    return data;
};
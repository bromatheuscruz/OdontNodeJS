const md5 = require("md5");

exports.encrypt = (password) =>  md5(password + global.SALT_KEY);

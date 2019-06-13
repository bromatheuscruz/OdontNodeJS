const mongoose = require("mongoose");
const User = mongoose.model("User");

exports.create = async data => {
    const user = new User(data);
    await user.save();
}

exports.findByCredentials = async credentials => await User.findOne(credentials);
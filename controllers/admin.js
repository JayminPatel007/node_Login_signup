const User = require("../models/user");

module.exports.postLogin = (req, res, next)=>{
    res.send("LogIn");
}

module.exports.postSignUp = (req, res, next)=>{
    res.send("SignUP");
}

module.exports.getAllUsers = (req, res, next)=>{
    res.send("Users");
}
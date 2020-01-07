const User = require("../models/user");
const mongoose= require("mongoose");
const jwt = require("jsonwebtoken");
const {validationResult} = require("express-validator");
const secret = "secret"


module.exports.postLogin = (req, res, next)=>{
    const errors = validationResult(req);
    console.log(errors)
    if (!errors.isEmpty()){
        return res.status(422).json({error: {
            massage: "Back-End Validation Error"
        }})
    }
    console.log(typeof(errors))
    console.log(errors)
    User.find({email: req.body.email}).then(data=>{
        if(data.length == 0){
            res.status(404).json({
                error: {
                    massage: "User is not registered with this email"
                }
            })
        } else{
            console.log(data[0].email, data[0].password)
            if (data[0].password == req.body.password){
                const token = jwt.sign({
                    email: data[0].email,
                    userid: data[0]._id
                }, secret, {
                    expiresIn: "1h"
                })
                res.status(200).json({
                    massage: "Logged in",
                    token: token
                })
            } else{
                res.status(417).json({
                    error : {
                        massage: "Auth Fail"
                    }
                })
            }
        }
    }).catch(err=>{
        console.log(err);
    });
}

module.exports.postSignUp = (req, res, next)=>{
    const errors = validationResult(req);
    console.log(typeof(errors))
    if (!errors.isEmpty()){
        return res.status(422).json({error: {
            massage: "Back-end Validation Error"
        }})
    }
    User.find({email: req.body.email}).then(data=>{
        if (data.length>0){
            res.status(409).json({
                error:{
                    massage: "User is already registered with this e-mail."
                }
                
            })
        } else{
            const user = new User({
                _id: new mongoose.Types.ObjectId,
                name: req.body.name,
                email: req.body.email,
                gender: req.body.gender,
                birthDate: req.body.birthDate,
                address: req.body.address,
                password: req.body.password
            });
            user.save().then(data =>{
                res.status(201).json({
                    massage: "User Created",
                });
            }
            ).catch(err=>{
                console.log(err)
                res.status(500).json({
                    error : {
                        massage: "Internal server error"
                    }
                })
            })
        }
    })
    
    
}

module.exports.getAllUsers = (req, res, next)=>{
    User.find().then(data=>{
        res.status(200).json(data)
    }).catch(err=>{
        res.send(500).json({
            error: {
                massage: "Internal Server Error!"
            }
        })
    })
}

module.exports.postEditUser = (req, res, next)=>{
    const userid = req.params.id;
    console.log(userid)
}

module.exports.deleteUser = (req, res, next)=>{
    //TODO : Delete User Controller
}
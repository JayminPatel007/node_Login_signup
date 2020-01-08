const express = require("express");
const mongoose = require("mongoose");
const BodyParser = require("body-parser");
const morgan = require("morgan");
const {check} = require("express-validator");

const adminController = require("./controllers/admin")
const checkAuth = require("./middleware/checkAuth");

const app = express();

app.use((req, res, next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, Accept")
    if (req.method === "OPTIONS"){
        res.header("Access-Control-Allow-Methods", "POST, GET, DELETE, PUT, PATCH")
        return res.status(200).json({})
    }
    next()
})

app.use(BodyParser.urlencoded({extended: false}));
app.use(BodyParser.json())
app.use(morgan('dev'));

app.post("/login",[check('email').isEmail(), check('password').isLength({min: 1})], adminController.postLogin);

app.post("/signup",[check('email').isEmail(), check('name').isLength({min:1}), check('password').isLength({min: 1})], adminController.postSignUp);

app.put("/users/:id",checkAuth, [check('name').isLength({min:1}), check('password').isLength({min: 1})], adminController.postEditUser);

app.get("/users/:id", checkAuth, adminController.getUserByIdController)

app.delete("/users/:id",checkAuth, adminController.deleteUser);

app.get("/users",checkAuth, adminController.getAllUsers);

app.use((req, res, next)=>{
    const error = new Error();
    error.status=404;
    error.massage = "Not Found"
    next(error);
});

app.use((error, req, res, next)=>{
    res.status(error.status || 500)
    res.json({
        error: {
            massage: error.massage
        }
    });
})

mongoose.connect('mongodb+srv://admin:admin@cluster0-jlrzq.mongodb.net/test?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, ()=>{
    console.log("Connected to database!")
});

app.listen(8000, (req,res)=>{
    console.log("App is listning at port 8000");
});
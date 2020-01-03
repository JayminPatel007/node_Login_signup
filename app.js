const express = require("express");
const mongoose = require("mongoose");
const BodyParser = require("body-parser");
const morgan = require("morgan");

const adminController = require("./controllers/admin")
const checkAuth = require("./middleware/checkAuth");

const app = express();

// app.use((req, res, next)=>{
//     res.header('Access-Control-Allow-Origin', "*");
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
//     if (req.method === "OPTIONs"){
//         res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, PATCH, DELETE');
//         return res.status(200).json({})
//     }
// })

app.use(BodyParser.urlencoded({extended: false}));
app.use(BodyParser.json())
app.use(morgan('dev'));

app.post("/login", adminController.postLogin);

app.post("/signup", adminController.postSignUp);

app.get("/users", checkAuth, adminController.getAllUsers);

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
});

app.listen(3000, (req,res)=>{
    console.log("App is listning at port 3000");
});
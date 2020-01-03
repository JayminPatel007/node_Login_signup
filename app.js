const express = require("express");
const mongoose = require("mongoose");

const adminController = require("./controllers/admin")

const app = express();

app.post("/login", adminController.postLogin);

app.post("/signup", adminController.postSignUp);

app.get("/users", adminController.getAllUsers);

await mongoose.connect('mongodb+srv://admin:admin@cluster0-jlrzq.mongodb.net/test?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.listen(3000, (req,res)=>{
    console.log("App is listning at port 3000");
});
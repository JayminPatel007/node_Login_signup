var express = require("express");
var app = express();

app.use("/", (req, res)=>{
    res.send("Connected");
})

app.listen(3000, (req,res)=>{
    console.log("App is listning at port 3000");
});
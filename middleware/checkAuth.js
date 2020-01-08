const jwt = require("jsonwebtoken");
const secret = "secret";

module.exports = (req, res, next)=>{
    try{
        const token = req.headers.authorization.split(" ")[1]
        const decoded = jwt.verify(token, secret);
        req.userData = decoded;
        next();
    } 
    catch(error){
        return res.status(401).json({
            error:{
                massage: "Auth Failed!"
            }
        })
    }
}
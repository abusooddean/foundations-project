require("dotenv").config(); //https://www.npmjs.com/package/dotenv
const jwt = require("jsonwebtoken");
const logger = require("./logger")

const SECRET_KEY = process.env.SECRET_KEY;
// console.log(SECRET_KEY);

async function authenticateToken(req, res, next){
    //Authorization : "Bearer tokenstring"
    const authHeader = req.headers["Authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if(!token){
        res.status(400).json({message: "forbidden access"});
    } else{
        const user = await decodeJWT(token);
        if(user){
            req.user = user;
            next();
        } else{
            res.status(400).json({message: "Bad JWT"});
        }
    }
}



async function decodeJWT(token){
    try{
        const user = await jwt.verify(token, SECRET_KEY);
        return user;
    } catch(error){
        logger.error(error);
        return null;
    }
}

module.exports = {
    authenticateToken
}
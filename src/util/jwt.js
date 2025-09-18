require("dotenv").config(); //https://www.npmjs.com/package/dotenv
const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.SECRET_KEY;

function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(400).json({ message: "No token" });
    }

    const user = decodeJWT(token);
    if (!user) {
        return res.status(400).json({ message: "Invalid token" });
    }

    req.user = user;
    next();
}

function authorizeEmployee(req, res, next) {
    if (!req.user) {
        return res.status(400).json({ message: "Unauthorized" });
    }

    if (req.user.isManager) {
        return res.status(400).json({ message: "Access denied, only employees allowed" });
    }

    next();
}

function authorizeManager(req, res, next) {
    if (!req.user) {
        return res.status(400).json({ message: "Unauthorized" });
    }

    if (!req.user.isManager) {
        return res.status(400).json({ message: "Access denied, only managers allowed" });
    }

    next();
}

function decodeJWT(token){
    try{
        const user = jwt.verify(token, SECRET_KEY);
        return user;
    } catch(error){
        return null;
    }
}

module.exports = {
    authenticateToken,
    authorizeManager,
    authorizeEmployee
}
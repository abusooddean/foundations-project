require("dotenv").config();
const express = require('express')
const router = express.Router();
const jwt = require('jsonwebtoken');
const userService = require("../service/userService");


const SECRET_KEY = process.env.SECRET_KEY;

//user register
router.post("/register", validateUserData, async (req, res) => {
    const data = await userService.createUser(req.body);
    if(data.status === "created"){
        res.status(201).json({message: `Created User ${JSON.stringify(data)}`});
    }else if(data.status === "exists"){
        res.status(400).json({message: `Username already exists ${JSON.stringify(data)}`});
    }else{
        res.status(400).json({message: "User not created", data: req.body});
    }
} )

//user login
router.post("/login", validateUserData, async (req, res) => {
    const {username, password} = req.body;
    const data = await userService.validateUserCredentials({username, password});
    if(data){
        const token = jwt.sign(
            {
                user_id: data.user_id,
                username: data.username,
                isManager: data.isManager
            },
            SECRET_KEY,
            {
                expiresIn: "1d"
            }
        );
        res.status(200).json({message: "You have logged in", token});
    }else{
        res.status(400).json({message: "Invalid login"});
    }
})

function validateUserData(req, res, next){
    const user = req.body;
    if(user.username && user.password){
        next();
    }else{
        res.status(400).json({message: "Invalid username or password", data: user});
    }
}


module.exports = router;
require("dotenv").config();
const express = require('express')
const router = express.Router();
const {logger} = require('../util/logger');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userService = require("../service/userService");
const {authenticateToken } = require("../util/jwt");


const SECRET_KEY = process.env.SECRET_KEY;

//user register
router.post("/register", validateUserData, checkIfUsernameExists, async (req, res) => {
    const data = await userService.createUser(req.body);
    if(data){
        res.status(201).json({message: `Created User ${JSON.stringify(data)}`});
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
                id: data.user_id,
                username
            },
            SECRET_KEY,
            {
                expiresIn: "15m"
            }
        );
        res.status(200).json({message: "You have logged in", token});
    }else{
        res.status(401).json({message: "Invalid login"});
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

async function checkIfUsernameExists(req, res, next){
    const username  = req.body.username;
    const usernameExists = await userService.checkIfUsernameExists(username);
    if(usernameExists){
        res.status(400).json({message: "Username already exists", data: username});
    }else{
        next();
    }
}

module.exports = router;
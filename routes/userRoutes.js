const express = require('express')
const router = express.Router();

//TO DO:
// Login / Register Feature
// The login and register feature is meant to give you preliminary experience handling authentication within an application. 
// These features allow you to ensure you can track or maintain who can connect to your application. 
// User Stories As an Employee or Manager, I should be able to log into the application.

router.post("/register", async (req, res) => {
    //register with username and password
    //username must be unique
    //set default employee role, maybe in model?
    logger.info("New user ___ registered")
    res.send("Successfully registered new user")
})

router.post("/login", async (req, res) => {
    //first must check if username exists
    //then login user if password matches
    logger.info("___ logged in")
    res.send("Successfully logged in user")
})

module.exports = router;
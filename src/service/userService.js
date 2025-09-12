const userDAO = require("../repository/userDAO");
const bcrypt = require('bcrypt');
const {logger} = require('../util/logger')

async function createUser(user){
    const saltRounds = 10;
    const password = await bcrypt.hash(user.password, saltRounds);
    const data = await userDAO.createUser({
        user_id: crypto.randomUUID(),
        username: user.username,
        password,
        isManager: user.isManager ?? false,
    })
    logger.info(`Creating new user: ${JSON.stringify(data)}`);
    console.log(data);

    if(data){
        return user;
    }else{
        return null;
    }  
}

//helper functions
async function checkIfUsernameExists(username){
   if(await userDAO.getUserByUsername(username)){
        return true;
   }
   return false;
}

function validateUser(user){
    const usernameResult = user.username.length > 0;
    const passwordResult = user.password.length > 0;
    return (usernameResult && passwordResult);
}

async function validateUserCredentials(user){
    const existingUser = await userDAO.getUserByUsername(user.username);
    if(existingUser){
        const passwordMatch = await bcrypt.compare(user.password, existingUser.password);
        if(passwordMatch){
            return existingUser;
        }else{
            return null; //password doesnt match
        }
    } else{
        return null; // no existing user
    }
}

module.exports = {
    createUser,
    checkIfUsernameExists,
    validateUser,
    validateUserCredentials
}
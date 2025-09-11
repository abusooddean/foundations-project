const userDAO = require("../repository/userDAO");
const bcrypt = require('bcrypt');
const {logger} = require('../util/logger')

async function createUser(user){
    //check before creating
    const username = user.username;
    if(await checkIfUsernameExists(username)){
        logger.info(`Username already exists: ${JSON.stringify(username)}`);
        return username;
    }

    const saltRounds = 10;
    if(validateUser(user)){
        const password = await bcrypt.hash(user.password, saltRounds);
        const data = await userDAO.createUser({
            user_id: crypto.randomUUID(),
            username,
            password,
            isManager: user.isManager ?? false, //if input then set otherwise default to false
        })
        logger.info(`Creating new user: ${JSON.stringify(data)}`);
        return data;
    }else{
        logger.info(`Failed to validate user: ${JSON.stringify(user)}`);
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

// testing purposes
// createUser({username: "user40", password: "pass400"}); 

module.exports = {
    createUser,
    // getUserById,
    // deleteUser
}
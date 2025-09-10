const userDAO = require("../repository/userDAO");
const bcrypt = require('bcrypt');
const {logger} = require('../util/logger')

async function createUser(user){
    const saltRounds = 10;
    if(validateUser(user)){
        const password = await bcrypt.hash(user.password, saltRounds);
        const data = await userDAO.createUser({
            username: user.username,
            password,
            user_id: crypto.randomUUID()
        })
        logger.info(`Creating new user: ${JSON.stringify(data)}`);
        return data;
    }else{
        logger.info(`Failed to validate user: ${JSON.stringify(user)}`);
        return null;
    }
}

function validateUser(user){
    const usernameResult = user.username.length > 0;
    const passwordResult = user.password.length > 0;
    return (usernameResult && passwordResult);
}

// createUser("user4", "pass4");

module.exports = {
    createUser,
    // getUserById,
    // deleteUser
}
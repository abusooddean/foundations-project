const userDao = require("../repository/userDAO");
const {checkIfValid} = require("../utils/verification");

async function createUser(username, password){
    const result = await userDao.createUser({user_id: crypto.randomUUID(), username, password});
    console.log(checkIfValid(result, "create", "user"))
}

// createUser("user4", "pass4");

async function getUserById(user_id){
    const result = await userDao.getUserByUserId(user_id);
    console.log(checkIfValid(result, "retrieve", "user"))
}

// getUserById("4e97d095-3719-41c2-b2cf-7a55a6105087");

async function deleteUser(user_id){
    const result = await userDao.deleteUser(user_id);
    console.log(checkIfValid(result, "delete", "user"))
}

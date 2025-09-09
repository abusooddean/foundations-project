function checkIfValid(result, action){
    if(!result){
        return {message: `failed to ${action} user`};
    }else{
        return {message: `${action}d user`, user: result};
    }
}

module.exports = {
    checkIfValid
};
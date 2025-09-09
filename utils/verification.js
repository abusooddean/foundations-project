function checkIfValid(result, action, item){
    if(!result){
        return {message: `failed to ${action} ${item}`};
    }else{
        return {message: `${action}d ${item}`, user: result};
    }
}

module.exports = {
    checkIfValid
};
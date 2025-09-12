const { DynamoDBClient} = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, GetCommand, PutCommand, ScanCommand} = require("@aws-sdk/lib-dynamodb")
const {logger} = require('../util/logger');

const client = new DynamoDBClient({region: "us-east-1"});

const documentClient = DynamoDBDocumentClient.from(client);

const TableName = "users";

//register user with username and password
async function createUser(user){
    const command = new PutCommand({
        TableName,
        Item: user
    })

    try{
        const data = await documentClient.send(command);
        logger.info(`PUT command to database complete ${JSON.stringify(data)}`);
        return user;
    }
    catch(error){
        console.log(error);
        return null;
    }
}

async function getUserByUserId(user_id){
    const command = new GetCommand({
        TableName,
        Key: {user_id}
    });

    try{
        const data = await documentClient.send(command);
        logger.info(`GET command to database complete ${JSON.stringify(data)}`);
        return data.Item;
    }
    catch(error){
        console.log(error);
        return null;
    }
}

// use to verify username exists on login
//https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/dynamodb-example-query-scan.html
async function getUserByUsername(username){
    const command = new ScanCommand({
        TableName,
        FilterExpression: "#username = :username",
        ExpressionAttributeNames: {"#username": "username"},
        ExpressionAttributeValues: {":username": username}
    });

    try{
        const data = await documentClient.send(command);
        logger.info(`SCAN command to database complete ${JSON.stringify(data)}`);
        return data.Items[0];
    }catch(error){
        logger.error(error);
        return null;
    }
}

module.exports = {
    createUser,
    getUserByUserId,
    getUserByUsername
}
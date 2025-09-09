const { DynamoDBClient, QueryCommand} = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, GetCommand, PutCommand, DeleteCommand, ScanCommand} = require("@aws-sdk/lib-dynamodb")
const {logger} = require('../utils/logger');

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
        await documentClient.send(command);
        logger.info("New user created by createUser()")
        return user;
    }
    catch(error){
        console.log(error);
        return null;
    }
}

// createUser({user_id: "", username: "usern", password:"passn"});

async function getUserByUserId(user_id){
    const command = new GetCommand({
        TableName,
        Key: {user_id}
    });

    try{
        const data = await documentClient.send(command);
        logger.info("user_id queried by getUserByUserId()")
        return data.Item;
    }
    catch(error){
        console.log(error);
        return null;
    }
}

// getUserByUserId("1");
// getUserByUserId("2");
// getUserByUserId("3");

// use to verify username exists on login
//https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/dynamodb-example-query-scan.html
async function getUserByUsername(username){
    const command = new ScanCommand({
       TableName,
       FilterExpression: "username = :username",
       ExpressionAttributeValues : {
        ":username": username
       }
    });

    try{
        const data = await documentClient.send(command);
        logger.info("Username queried by getUserByUsername()")
        return data.Items;
    }
    catch(error){
        console.log(error);
        return null;
    }
}

// getUserByUsername("user");

const { DynamoDBClient} = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, GetCommand, PutCommand, ScanCommand, UpdateCommand} = require("@aws-sdk/lib-dynamodb")
const {logger} = require('../util/logger');

const client = new DynamoDBClient({region: "us-east-1"});

const documentClient = DynamoDBDocumentClient.from(client);

const TableName = "tickets";

// ticket must have amount, desc, and default status of pending
async function createTicket(ticket){
    const command = new PutCommand({
        TableName,
        Item: ticket
    })

    try{
        const data = await documentClient.send(command);
        logger.info(`PUT command to database complete ${JSON.stringify(data)}`);
        return ticket;
    }
    catch(error){
        console.log(error);
        return null;
    }
}

// createTicket({ticket_id: "5",user_id: "be1e0bc1-9608-4ce4-887d-bcec6c5ced8a", amount: 1000000 , description: "dinner", status:"Pending"});

async function getTicketByStatus(status) {
    const command = new ScanCommand({
        TableName,
        FilterExpression: "#status = :status",
        ExpressionAttributeNames: {"#status": "status"},
        ExpressionAttributeValues: {":status": status}
    });

    try{
        const data = await documentClient.send(command);
        // console.log(data.Items);
        logger.info(`SCAN command to database complete ${JSON.stringify(data)}`);
        return data.Items;
    }catch(error){
        logger.error(error);
        return null;
    }
}

// getTicketByStatus("Pending");

async function getTicketById(ticket_id){
    const command = new GetCommand({
        TableName,
        Key: {ticket_id}
    });

    try{
        const data = await documentClient.send(command);
        // console.log(data.Item);
        logger.info(`GET command to database complete ${JSON.stringify(data)}`);
        return data.Item;
    }
    catch(error){
        console.log(error);
        return null;
    }
}

//https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/javascript_dynamodb_code_examples.html
async function updateTicketStatusByTicketId(ticket_id, status){
    const command = new UpdateCommand({
        TableName,
        Key : {
            ticket_id
        },
        UpdateExpression:"SET #statusKey = :statusVal",
        ExpressionAttributeNames : {
            "#statusKey" : "status"
        },
        ExpressionAttributeValues : {
            ":statusVal": status
        },
        ReturnValues: "ALL_NEW",
    });

    try{
        const data = await documentClient.send(command);
        logger.info(`UPDATE command to database complete ${JSON.stringify(data)}`);
        return ticket_id;
    }
    catch(error){
        console.log(error);
        return null;
    }
}

// updateTicketStatusByTicketId("023712ea-367e-4fe0-9b04-3fe0b48aa869", "Denied");

// getTicketById("1");

module.exports = {
    createTicket,
    getTicketByStatus,
    getTicketById,
    updateTicketStatusByTicketId
}
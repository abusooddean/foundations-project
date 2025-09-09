const { DynamoDBClient, QueryCommand} = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, GetCommand, PutCommand, DeleteCommand, ScanCommand} = require("@aws-sdk/lib-dynamodb")
const {logger} = require('../utils/logger');

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
        await documentClient.send(command);
        logger.info("New ticket created by createTicket()")
        return ticket;
    }
    catch(error){
        console.log(error);
        return null;
    }
}

// createTicket({ticket_id: "1", amount: 1, description: "business flight", status: "Pending"});

module.exports = {
    createTicket
}
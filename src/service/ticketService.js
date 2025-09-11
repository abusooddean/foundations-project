const ticketDAO = require("../repository/ticketDAO");
const userDAO = require("../repository/userDAO");
const {logger} = require('../util/logger')

async function createTicket(ticket){
    //check fields before creating
    if(validateTicket(ticket)){
        const data = await ticketDAO.createTicket({
            ticket_id: crypto.randomUUID(),
            user_id: ticket.user_id,
            amount: ticket.amount,
            description: ticket.description,
            status: "Pending",
        })
        logger.info(`Creating new ticket: ${JSON.stringify(data)}`);
        return data;
    }else{
        logger.info(`Failed to validate ticket: ${JSON.stringify(ticket)}`);
        return null;
    }
}

// 3. Ticketing System Feature
async function updateTicketStatusByTicketId(ticket_id, user_id, status){  
    //get user and verify isManager
    if(await validateIsManager(user_id)){ //isManager
        if(ticket_id && status){ //not empty
            if(await validateTicketIsPending(ticket_id)){
                const data = await ticketDAO.updateTicketStatusByTicketId(ticket_id, status);
                logger.info(`Updating ticket: ${JSON.stringify(data)}`);
                return data;
            }
        }
        else{
            logger.info(`Failed to update ticket: ${JSON.stringify(ticket_id)}`);
            return null;
        }      
    }
    else{
        logger.info(`User is not a manager: ${JSON.stringify(user_id)}`);
        return user_id;
    }
}


async function getTicketsByStatus(user_id, status){
    if(await validateIsManager(user_id)){
        if(status){
                const data = await ticketDAO.getTicketsByStatus(status);
                console.log(data);
                logger.info(`Getting all pending ticket: ${JSON.stringify(data)}`);
                return data;
            }
        else{
            logger.info(`Unable to get tickets: ${JSON.stringify(data)}`);
            return null;
        }
    }
    else{
        logger.info(`User is not a manager: ${JSON.stringify(user_id)}`);
            return null;
    }
}

// 4. View Previous Tickets Feature 
async function getAllTicketsByUserId(user_id){
    if(user_id){ //can add check to see if it exists later
        const data = await ticketDAO.getAllTicketsByUserId(user_id);
        logger.info(`Getting all ticket submissions for user: ${JSON.stringify(data)}`)
    }
    else{
        logger.info(`User has no tickets: ${JSON.stringify(user_id)}`);
        return null;
    }
}



// VALIDATION functions
async function validateIsManager(user_id){
    const user = await userDAO.getUserByUserId(user_id);
    return user.isManager;
}

async function validateTicketIsPending(ticket_id){
    const ticket = await ticketDAO.getTicketById(ticket_id);
    return ticket.status === "Pending";
}

function validateTicket(ticket){
    const ticketAmount = ticket.amount > 0;
    const ticketDescription = ticket.description.length > 0;
    return (ticketAmount && ticketDescription);
}

//TESTING
// createTicket({user_id: "1", amount: 10 , description: "business dinner"});
// createTicket({user_id: "be1e0bc1-9608-4ce4-887d-bcec6c5ced8a", amount: 100 , description: "flight"});
// createTicket({user_id: "be1e0bc1-9608-4ce4-887d-bcec6c5ced8a", amount: 1000 , description: "dinner"});

// updateTicketStatusByTicketId("5", "86669adf-6f6a-4acd-a3cf-de46e922257c", "Denied") //not manager
// updateTicketStatusByTicketId("5", "ff059095-ee84-4c1d-a834-3f05e529aca7", "Approved") //manager

//getTicketByStatus("ff059095-ee84-4c1d-a834-3f05e529aca7", "Pending");

module.exports = {
    createTicket,
    updateTicketStatusByTicketId,
    getTicketsByStatus
}
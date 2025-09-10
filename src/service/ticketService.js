const ticketDAO = require("../repository/ticketDAO");
const {logger} = require('../util/logger')

async function createTicket(ticket){
    //check before creating
    if(validateTicket(ticket)){
        const data = await ticketDAO.createTicket({
            ticket_id: crypto.randomUUID(),
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

function validateTicket(ticket){
    const ticketAmount = ticket.amount > 0;
    const ticketDescription = ticket.description.length > 0;
    return (ticketAmount && ticketDescription);
}

createTicket({amount: 10 , description: ""});
const ticketDAO = require("../repository/ticketDAO");
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

// async function updateTicket(ticket){  --- only need certain values such as ticket_id ? and update its status ---
//     if(ticket){
//     const data = await ticketDAO.updateTicket({
//             ticket_id: ticket.ticket_id,
//             user_id: ticket.user_id,
//             amount: ticket.amount,
//             description: ticket.description,
//             status: ticket.status,
//         })
//         logger.info(`Updating ticket: ${JSON.stringify(data)}`);
//         return data;
//     }else{
//         logger.info(`Failed to update ticket: ${JSON.stringify(ticket)}`);
//         return null;
//     }
// }

function validateTicket(ticket){
    const ticketAmount = ticket.amount > 0;
    const ticketDescription = ticket.description.length > 0;
    return (ticketAmount && ticketDescription);
}

//TESTING
// createTicket({user_id: "1", amount: 10 , description: "business dinner"});
// createTicket({user_id: "be1e0bc1-9608-4ce4-887d-bcec6c5ced8a", amount: 100 , description: "flight"});
// createTicket({user_id: "be1e0bc1-9608-4ce4-887d-bcec6c5ced8a", amount: 1000 , description: "dinner"});

// updateTicket({ticket_id: "933fdc36-9512-454e-8eb5-a035819ce859", user_id: "be1e0bc1-9608-4ce4-887d-bcec6c5ced8a", amount: 10 , description: "business lunch", status:"Processing"});

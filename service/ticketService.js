const ticketDAO = require("../repository/ticketDAO");
const {checkIfValid} = require("../utils/verification");

async function createTicket(amount, description, status){
    const result = await ticketDAO.createTicket({ticket_id: crypto.randomUUID(), amount, description, status: "Pending"});
    console.log(checkIfValid(result, "create", "ticket"))
}

// createTicket({amount: 100, description: "business flight", status: "Pending"});
const ticketDAO = require("../repository/ticketDAO");
const {checkIfValid} = require("../utils/verification");

async function createTicket(amount, description, status= "Pending"){
    const result = await ticketDAO.createTicket({ticket_id: crypto.randomUUID(), amount, description, status});
    console.log(checkIfValid(result, "create", "ticket"))
}

createTicket(100, "business lunch");
const express = require('express')
const router = express.Router();
const ticketService = require("../service/ticketService");
const {authenticateToken, authorizeManager, authorizeEmployee} = require("../util/jwt");


// //The submit ticket feature is meant to guide you through input acceptance, validation, and error handling. 
// // The ability to submit a reimbursement request ticket is the core functionality of this application. 
// // User Stories Employees can submit a new reimbursement ticket

//create ticket
router.post("/", authenticateToken, authorizeEmployee, validateTicketData, async (req, res) => {
    const user_id = req.user.user_id;
    const data = await ticketService.createTicket({...req.body, user_id});
    if(data){
        res.status(201).json({message: `Created ticket ${JSON.stringify(data)}`});
    }else{
        res.status(400).json({message: "Ticket not created", data: req.body});
    }
})

//get all pending tickets
router.get("/", authenticateToken, authorizeManager, async (req, res) => {
    const status = req.query.status;
    if (!status) return res.status(400).json({ message: "No status queried" });

    const tickets = await ticketService.getTicketsByStatus(status);
    if (tickets) {
        res.status(200).json({ message: `Tickets with status ${status}`, data: tickets });
    }else{
        res.status(400).json({ message: "No tickets found" });
    }
});

//update pending ticket
router.patch("/:ticketid", authenticateToken, authorizeManager, validateTicketUpdateData, async (req, res) => {
    const ticketId = req.params.ticketid;
    const status = req.body.status;
    // console.log(ticketId)
    const updatedTicket = await ticketService.updateTicketStatusByTicketId(ticketId, status);
    if(updatedTicket) {
        res.status(200).json({message: "Ticket updated successfully", data: updatedTicket});
    }else{
        res.status(400).json({message: "Ticket not updated", data: req.body});
    }
});

//get tickets by user_id https://github.com/expressjs/express/blob/master/examples/params/index.js
router.get("/past", authenticateToken, async (req, res) => {
    const userId = req.user.user_id;
    const username = req.user.username;
    const queryUser = req.query.user;

    if(queryUser && queryUser !== username) {
        return res.status(400).json({ message: "Cannot view other users' tickets" });
    }

    const tickets = await ticketService.getTicketsByUserId(userId);
    if(tickets) {
        res.status(200).json({ message: `Tickets submitted by ${username}`, data: tickets });
    }else{
        res.status(400).json({ message: `No tickets found for ${username}` });
    }
});

//middleware/validation checks
function validateTicketData(req, res, next){
    const ticket = req.body;
    if(ticket.amount && ticket.description){
        next();
    }else{
        if(!ticket.amount){
            res.status(400).json({message: "Invalid ticket amount", data: ticket});
        }else if(!ticket.description){
            res.status(400).json({message: "Missing ticket description", data: ticket});
        }
    }
}

function validateTicketUpdateData(req, res, next){
    const status = req.body.status;
    if(status !== "Approved" && status !== "Denied"){
        return res.status(400).json({message: `Only "Approved" and "Denied" are supported`});
    }
        
    next();
}

module.exports = router;
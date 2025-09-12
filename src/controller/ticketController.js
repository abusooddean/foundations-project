const express = require('express')
const router = express.Router();
const ticketService = require("../service/ticketService");


// //The submit ticket feature is meant to guide you through input acceptance, validation, and error handling. 
// // The ability to submit a reimbursement request ticket is the core functionality of this application. 
// // User Stories Employees can submit a new reimbursement ticket
router.post("/", validateTicketData, async (req, res) => {
    const data = await ticketService.createTicket(req.body);
        if(data){
            res.status(201).json({message: `Created ticket ${JSON.stringify(data)}`});
        }else{
            res.status(400).json({message: "Ticket not created", data: req.body});
        }
})

//get all pending tickets

router.get("/", validateIsManager, async (req, res) => {
    const data = await ticketService.getTicketsByStatus(req.body.status);
    if(data){
        res.status(201).json({message: `All pending tickets: ${JSON.stringify(data)}`})
    }else{
        res.status(400).json({message: "No pending tickets found", data: req.body});
    }
})

//update pending ticket
//get tickets by user_id


function validateTicketData(req, res, next){
    const ticket = req.body;
    if(ticket.user_id && ticket.amount && ticket.description){
        next();
    }else{
        res.status(400).json({message: "Invalid user_id, amount, or description", data: ticket});
    }
}

async function validateIsManager(req, res, next){
    const user_id = req.body.user_id;
    if(await ticketService.validateIsManager(user_id)){
        next();
    }else{
        res.status(400).json({message: "User is not a manager", data: user_id});
    }
}


module.exports = router;
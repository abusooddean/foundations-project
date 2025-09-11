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




// //filter tickets by status
// router.get(`/status=${ticketStatus}`, async (req, res) => {
//     //verify only manager?
//     logger.info("___ viewing all pending tickets")
//     res.send("Successful GET")
// })

// //see specific employee tickets
// router.get(`/${employeeId}`, async (req, res) => {
//     //verify only manager?
//     logger.info("___ viewing all employee tickets")
//     res.send("Successful GET")
// })

function validateTicketData(req, res, next){
    const ticket = req.body;
    if(ticket.user_id && ticket.amount && ticket.description){
        next();
    }else{
        res.status(400).json({message: "Invalid user_id, amount, or description", data: ticket});
    }
}



module.exports = router;
const express = require('express')
const router = express.Router();
const {logger} = require('../utils/logger');

//The submit ticket feature is meant to guide you through input acceptance, validation, and error handling. 
// The ability to submit a reimbursement request ticket is the core functionality of this application. 
// User Stories Employees can submit a new reimbursement ticket
router.post("/submit", async (req, res) => {
    // ** Must have an amount **
    // ** Must have a description **
    // Should have a default status of Pending
    logger.info("___ submitted ticket")
    res.send("___ successfully submitted a ticket")
})

// const ticketStatus = "Pending"
// const employeeId = "1"

//filter tickets by status
router.get(`/status=${ticketStatus}`, async (req, res) => {
    //verify only manager?
    logger.info("___ viewing all pending tickets")
    res.send("Successful GET")
})

//see specific employee tickets
router.get(`/${employeeId}`, async (req, res) => {
    //verify only manager?
    logger.info("___ viewing all employee tickets")
    res.send("Successful GET")
})



module.exports = router;
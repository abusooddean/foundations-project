const {logger} = require('../utils/logger');
const express = require('express')
const router = express.Router();

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



module.exports = router;
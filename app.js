const userController = require('./controller/userController')
const ticketController = require('./controller/ticketController')
const express = require('express')

const app = express()
const port = 3000

app.use(express.json())

app.use("/user", userController)
app.use("/tickets", ticketController)


app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})

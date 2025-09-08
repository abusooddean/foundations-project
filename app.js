const userRoutes = require('./routes/userRoutes')
const ticketRoutes = require('./routes/ticketRoutes')
const express = require('express')

const app = express()
const port = 3000

app.use(express.json())

app.use("/user", userRoutes)
app.use("/tickets", ticketRoutes)


app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})

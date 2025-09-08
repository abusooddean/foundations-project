const {logger} = require('./utils/logger');
const userRoutes = require('./routes/userRoutes')
const express = require('express')

const app = express()
const port = 3000

app.use(express.json())

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

app.use("/user", userRoutes)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

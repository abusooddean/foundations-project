const {logger} = require('./utils/logger');
const express = require('express')
const app = express()
const port = 3000

//log in for both employee and financial manager
//need to have auth access for each regarding requests

//employee: login, add new or view past requests
//manager: login, view all requests + pending + filter option, approve or deny requests (update employee request status)


app.get('/', (req, res) => {
  res.send('Hello World!')
  logger.log({
  level: 'info',
  message: 'Test'
});
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

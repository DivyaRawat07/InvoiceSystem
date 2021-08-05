const express = require('express')
const app = express()
const logger = require('./logger')
const port = 4000

app.listen(port, () => {
    logger.error(`Server Listening and running on ${port}`)
})



app.use(express.json());

const db = require('./dbConnection/dbConnection')

const userRoute = require('./routes/userRoute')
app.use('/users', userRoute)

const customers = require('./routes/customers');
const invoices = require('./routes/invoices');

app.use('/customers', customers);
app.use('/invoices', invoices);



//require('dotenv').config({path:'../envFile/.env'})
const mongoose = require('mongoose')
const dbName = 'invoiceDb'
const url=`mongodb://localhost:27017/${dbName}`

mongoose.connect(url, { useNewUrlParser: true,useUnifiedTopology: true }, (error, result) => {
     if (error) {
         console.log(error)
     } else {
         console.log("Successfully connected.")
     }
 })
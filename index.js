const express = require("express")
const app = express()
const base = require("./db")
const bodyParser = require("body-parser")
const cors = require('cors')

const loginPage = require("./loginPage")
const ecr = require("./ecr")
const filter = require("./filter")
const dropdown = require("./dropdown")
const dummy = require("./dummy")

app.listen(4321,()=>{
    console.log("Server started")
})

app.use(cors())
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.use('/loginPage',loginPage)
app.use('/ecr',ecr)
app.use('/filter',filter)
app.use('/dropdown',dropdown)
app.use('/dummy',dummy)
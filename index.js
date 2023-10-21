const express = require("express")
const app = express()
const base = require("./db")
const bodyParser = require("body-parser")
const loginPage = require("./loginPage")
const ecr = require("./ecr")

app.listen(4321,()=>{
    console.log("Server started")
})

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.use('/loginPage',loginPage)
app.use('/ecr',ecr)

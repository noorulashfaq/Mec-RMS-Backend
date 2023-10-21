const express = require("express")
const app = express()
const base = require("./db")
const bodyParser = require("body-parser")
const ecrWorkshop = require("./ecrWorkshop")

app.listen(1234,()=>{
    console.log("Server started")
})

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.use('/ecrWorkshop',ecrWorkshop)
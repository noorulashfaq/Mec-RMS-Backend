const express=require('express')
const bodyParser=require('body-parser')
const cors=require('cors')
const workshop=require('./ecrWorkshopFlow')
const seminar=require('./ecrSeminarFlow')

const ecr=require('./ecr')
const filter=require('./filter')
const dropdown=require('./dropdown')

const app=express()

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(cors())

// app.use('/ecr',workshop)
app.use('/seminar',seminar)

app.use('/ecr',ecr)
app.use('/filter',filter)
app.use('/dropdown',dropdown)

app.listen(1234,()=>{
    console.log("App is running")
})
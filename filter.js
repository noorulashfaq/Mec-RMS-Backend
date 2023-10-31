const express = require("express")
const route = express.Router()
const base = require("./db")


route.get('/filterReportsWithDept/:deptID',async(req,res)=>{
    let sql="call FetchReportsWithDept(?)"
    base.query(sql,[req.params.deptID],(err,rows)=>{
        if(err){
            res.status(500).json({error:err.message})
            return
        }
        else if(rows.length==0){
            res.status(201).json({error:"No matches found"})
            return
        }
        res.status(200).json({rows})
    })
})



module.exports = route
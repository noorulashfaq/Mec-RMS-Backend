const express = require("express")
const route = express.Router()
const base = require("./db")

route.post('/loginCredentials',async(req,res)=>{
    const{faculty_id,faculty_password}=req.body
    const sql="select * from data_faculty where faculty_id=? and faculty_password=?"
    base.query(sql,[faculty_id,faculty_password],(err,rows)=>{
        if(err){
            res.status(500).json({error:err.message})
            return
        }
        if(rows.length==0){
            res.status(404).json({error:"Invalid email/password"})
            return
        }
        res.status(200).json(rows[0])
    })
})

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
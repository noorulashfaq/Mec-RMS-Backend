const express = require("express")
const route = express.Router()
const base = require("./db")

route.get('/checkFacultyLevels/:deptid/:empid',async(req,res)=>{
    let sql = "call checkApprovalFacultyWithEmpId(?,?)"
    base.query(sql,[req.params.deptid,req.params.empid],(err,rows)=>{
        if(err){
            res.status(500).json({error:err.message})
            return
        }
        if(rows.length==0){
            res.status(404).json({error:"No matches"})
            return
        }
        res.status(200).json({rows})
    })
})

module.exports=route
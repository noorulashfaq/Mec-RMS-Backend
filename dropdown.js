const express = require("express")
const route = express.Router()
const base = require("./db")

route.get('/dropdownMajorType',async(req,res)=>{
    let sql="select * from data_major_report_type"
    base.query(sql,(err,rows)=>{
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

route.get('/dropdownSubTypeWithMajor/:majorId',async(req,res)=>{
    let sql="select * from data_sub_report_type where major_report_id = ?"
    base.query(sql,[req.params.majorId],(err,rows)=>{
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


route.get('/dropdownDept',async(req,res)=>{
    let sql="select * from data_dept"
    base.query(sql,(err,rows)=>{
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

route.get('/dropdownFacultyWithDept/:deptId',async(req,res)=>{
    let sql="select * from data_faculty where faculty_dept_id=?"
    base.query(sql,[req.params.deptId],(err,rows)=>{
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

route.get('/dropdownVenue',async(req,res)=>{
    let sql="select * from data_venue"
    base.query(sql,(err,rows)=>{
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
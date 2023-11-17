const express = require("express")
const route = express.Router()
const base = require("./db")

route.get('/dropdownMajorTypeWithHead/:headId',async(req,res)=>{
    let sql="select * from data_major_report_type where head_report_id=?"
    base.query(sql,[req.params.headId],(err,rows)=>{
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

route.get('/dropdownFacultyWithDept',async(req,res)=>{
    let sql="select * from data_faculties inner join data_dept on data_faculties.dept_id = data_dept.dept_id where not faculty_designation_id in (401,402,403,404)"
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

route.get('/currentAcademicYear',async(req,res)=>{
    let sql="select acd_yr,acd_status from predefined_academic_year where acd_status=1 or acd_status=2"
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
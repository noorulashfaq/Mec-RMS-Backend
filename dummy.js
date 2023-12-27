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

route.get('/loadforlevel1/:deptId/:empId',async(req,res)=>{
    const dId=req.params.deptId
    const eId=req.params.empId
    let sql=`call check_lvl1_approvals(?,?)`
    base.query(sql,[dId,'%'+eId+'%'],(err,row)=>{
        if(err){
            res.status(500).json({error:err.message})
            return
        }
        if(row.length==0){
            res.status(404).json({error:"No matches"})
            return
        }
        sql=`call onloadallproposalsforlevel1(?);`
        base.query(sql,[dId],(err,rows)=>{
            if(err){res.status(500).json({error:err.message});return;}
            if(row.length==0){res.status(404).json({error:"Nothing to show"})}
            res.status(200).json({rows})
        })
    })
})

// route.get('/getAllReportsAcrossTables/:deptId/:empId',async(req,res)=>{
//     let receivedReports=[]
//     let dId=req.params.deptId
//     let eId=req.params.empId
//     let sql=`call checkApprovalFacultyWithEmpId(?,?)`
//     base.query(sql,[dId,eId],(err,rows)=>{
//         if(err){
//             res.status(500).json({err})
//             return
//         }
//         else if(rows.length==0){
//             res.status(401).json({"message":"no records found"})
//             return
//         }
//         // res.status(200).json({rows})
//         // console.log(rows[0])
//         for(let i=0;i<rows[0].length;i++){
//             // console.log(rows[0][i].data_table_name)
//             let name_table=rows[0][i].data_table_name
//             let sql=`select * from ${name_table} where dept_id=? and coordinator_emp_id=?`
//             base.query(sql,[dId,eId],(err,result)=>{
//                 if(err){
//                     console.log("err")
//                     return
//                 }
//                 else if(result.length==0){
//                     console.log("message")
//                     return
//                 }
//                 // console.log({result})
//                 receivedReports.push({result})
//             })
//         }
//         console.log(receivedReports)
//     })
// })

module.exports=route
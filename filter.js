const express = require("express")
const route = express.Router()
const base = require("./db")

route.post('/loginCredentials',async(req,res)=>{
    const{faculty_id,faculty_password}=req.body
    const sql="select * from data_faculties where faculty_id=? and faculty_password=?"
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

route.get('/test/:deptID',async(req,res)=>{
    let sql="select * from data_management_workshop where dept_id =?"
    base.query(sql,[req.params.deptID],(err,temp)=>{
        if(err){
            res.status(500).json({error:err.message})
            return
        }
        else if(temp.length==0){
            res.status(201).json({error:"No matches found"})
            return
        }
        res.status(200).json({temp})
        console.log(temp[0])
    })
})

route.get('/filtersForDashboard/:head/:academic/:semester/:dept/:major/:sub/:faculty',async(req,res)=>{
    let sql="SELECT * FROM data_sub_report_type where head_report_id=?"
    base.query(sql,[req.params.head],(err,rows)=>{
        if(err){
            res.status(500).json({error:err.message})
            return
        }
        else if(rows.length==0){
            res.status(201).json({error:"No matches found"})
            return
        }
        // res.status(200).json({rows})
        let resultArray=[]
        for(let i=0;i<rows.length;i++){
            // console.log(rows[i].table_name)
            if(semester==null && dept==null && major==null && sub==null && faculty==null){
                // academic
                let sql=`SELECT * FROM ${rows[i].table_name} where acdyr_id=?`
                base.query(sql,[req.params.academic],(err,temp)=>{
                    if(err){
                        res.status(500).json({error:err.message})
                        return
                    }
                    else if(temp.length==0){
                        res.status(201).json({error:"No matches found"})
                        return
                    }
                    for(let i=0;i<temp.length;i++){
                        resultArray.push(temp)
                    }
                })
            }else if(academic==null && dept==null && major==null && sub==null && faculty==null){
                // semester
                let sql=`SELECT * FROM ${rows[i].table_name} where sem_id=?`
                base.query(sql,[req.params.semester],(err,temp)=>{
                    if(err){
                        res.status(500).json({error:err.message})
                        return
                    }
                    else if(temp.length==0){
                        res.status(201).json({error:"No matches found"})
                        return
                    }
                    for(let i=0;i<temp.length;i++){
                        resultArray.push(temp)
                    }
                })
            }else if(academic==null && semester==null && major==null && sub==null && faculty==null){
                // dept
                let sql=`SELECT * FROM ${rows[i].table_name} as row_table_name inner join data_sub_report_type as sub_type on row_table_name.event_name = sub_type.table_name inner join data_major_report_type as major_type on sub_type.major_report_id= major_type.major_report_id where row_table_name.dept_id=?;`
                base.query(sql,[req.params.dept],(err,temp)=>{
                    if(err){
                        res.status(500).json({error:err.message})
                        return
                    }
                    else if(temp.length==0){
                        res.status(201).json({error:"No matches found"})
                        return
                    }
                    for(let i=0;i<temp.length;i++){
                        resultArray.push(temp)
                    }
                })
            }else if(academic==null && semester==null && dept==null && sub==null && faculty==null){
                // major
                let sql=`SELECT * FROM ${rows[i].table_name} as row_table_name inner join data_sub_report_type as sub_type on row_table_name.event_name = sub_type.table_name inner join data_major_report_type as major_type on sub_type.major_report_id= major_type.major_report_id where major_type.major_report_id=?;`
                base.query(sql,[req.params.major],(err,temp)=>{
                    if(err){
                        res.status(500).json({error:err.message})
                        return
                    }
                    else if(temp.length==0){
                        res.status(201).json({error:"No matches found"})
                        return
                    }
                    for(let i=0;i<temp.length;i++){
                        resultArray.push(temp)
                    }
                })
            }else if(academic==null && semester==null && dept==null && major==null && faculty==null){
                // sub
                let sql=`SELECT * FROM ${rows[i].table_name} as row_table_name inner join data_sub_report_type as sub_type on row_table_name.event_name = sub_type.table_name inner join data_major_report_type as major_type on sub_type.major_report_id= major_type.major_report_id where sub_type.sub_report_id=?;`
                base.query(sql,[req.params.sub],(err,temp)=>{
                    if(err){
                        res.status(500).json({error:err.message})
                        return
                    }
                    else if(temp.length==0){
                        res.status(201).json({error:"No matches found"})
                        return
                    }
                    for(let i=0;i<temp.length;i++){
                        resultArray.push(temp)
                    }
                })
            }else if(academic==null && semester==null && dept==null && major==null && sub==null){
                // faculty
                let sql=`SELECT * FROM ${rows[i].table_name} as row_table_name inner join data_sub_report_type as sub_type on row_table_name.event_name = sub_type.table_name inner join data_major_report_type as major_type on sub_type.major_report_id= major_type.major_report_id where row_table_name.event_coordinator like ?;`
                base.query(sql,[req.params.faculty],(err,temp)=>{
                    if(err){
                        res.status(500).json({error:err.message})
                        return
                    }
                    else if(temp.length==0){
                        res.status(201).json({error:"No matches found"})
                        return
                    }
                    for(let i=0;i<temp.length;i++){
                        resultArray.push(temp)
                    }
                })
            }else if(dept==null && major==null && sub==null && faculty==null){
                // academic and semester
                let sql=`SELECT * FROM ${rows[i].table_name} as row_table_name inner join data_sub_report_type as sub_type on row_table_name.event_name = sub_type.table_name inner join data_major_report_type as major_type on sub_type.major_report_id= major_type.major_report_id where row_table_name.acdyr_id=? and row_table_name.sem_id=?;`
                base.query(sql,[req.params.academic,req.params.semester],(err,temp)=>{
                    if(err){
                        res.status(500).json({error:err.message})
                        return
                    }
                    else if(temp.length==0){
                        res.status(201).json({error:"No matches found"})
                        return
                    }
                    for(let i=0;i<temp.length;i++){
                        resultArray.push(temp)
                    }
                })
            }else if(academic==null && major==null && sub==null && faculty==null){
                //semester and dept
                let sql=`SELECT * FROM ${rows[i].table_name} as row_table_name inner join data_sub_report_type as sub_type on row_table_name.event_name = sub_type.table_name inner join data_major_report_type as major_type on sub_type.major_report_id= major_type.major_report_id where row_table_name.sem_id=? and row_table_name.dept_id=?;`
                base.query(sql,[req.params.semester,req.params.dept],(err,temp)=>{
                    if(err){
                        res.status(500).json({error:err.message})
                        return
                    }
                    else if(temp.length==0){
                        res.status(201).json({error:"No matches found"})
                        return
                    }
                    for(let i=0;i<temp.length;i++){
                        resultArray.push(temp)
                    }
                })
            }else if(academic==null && semester==null && sub==null && faculty==null){
                // dept and major
                let sql=`SELECT * FROM ${rows[i].table_name} as row_table_name inner join data_sub_report_type as sub_type on row_table_name.event_name = sub_type.table_name inner join data_major_report_type as major_type on sub_type.major_report_id= major_type.major_report_id where row_table_name.dept_id=? and major_type.major_report_id=?;`
                base.query(sql,[req.params.dept,req.params.major],(err,temp)=>{
                    if(err){
                        res.status(500).json({error:err.message})
                        return
                    }
                    else if(temp.length==0){
                        res.status(201).json({error:"No matches found"})
                        return
                    }
                    for(let i=0;i<temp.length;i++){
                        resultArray.push(temp)
                    }
                })
            }else if(academic==null && semester==null && dept==null && faculty==null){
                // major and sub
                let sql=`SELECT * FROM ${rows[i].table_name} as row_table_name inner join data_sub_report_type as sub_type on row_table_name.event_name = sub_type.table_name inner join data_major_report_type as major_type on sub_type.major_report_id= major_type.major_report_id where major_type.major_report_id=? and sub_type.sub_report_id=?;`
                base.query(sql,[req.params.major,req.params.sub],(err,temp)=>{
                    if(err){
                        res.status(500).json({error:err.message})
                        return
                    }
                    else if(temp.length==0){
                        res.status(201).json({error:"No matches found"})
                        return
                    }
                    for(let i=0;i<temp.length;i++){
                        resultArray.push(temp)
                    }
                })
            }else if(academic==null && semester==null && dept==null && major==null){
                // sub and faculty
                let sql=`SELECT * FROM ${rows[i].table_name} as row_table_name inner join data_sub_report_type as sub_type on row_table_name.event_name = sub_type.table_name inner join data_major_report_type as major_type on sub_type.major_report_id= major_type.major_report_id where sub_type.sub_report_id=? and row_table_name.event_coordinator like ?;`
                base.query(sql,[req.params.sub,req.params.faculty],(err,temp)=>{
                    if(err){
                        res.status(500).json({error:err.message})
                        return
                    }
                    else if(temp.length==0){
                        res.status(201).json({error:"No matches found"})
                        return
                    }
                    for(let i=0;i<temp.length;i++){
                        resultArray.push(temp)
                    }
                })
            }else if(semester==null && dept==null && major==null && sub==null){
                // faculty and academic
                let sql=`SELECT * FROM ${rows[i].table_name} as row_table_name inner join data_sub_report_type as sub_type on row_table_name.event_name = sub_type.table_name inner join data_major_report_type as major_type on sub_type.major_report_id= major_type.major_report_id where row_table_name.event_coordinator like ? and row_table_name.acdyr_id=?;`
                base.query(sql,[req.params.faculty,req.params.academic],(err,temp)=>{
                    if(err){
                        res.status(500).json({error:err.message})
                        return
                    }
                    else if(temp.length==0){
                        res.status(201).json({error:"No matches found"})
                        return
                    }
                    for(let i=0;i<temp.length;i++){
                        resultArray.push(temp)
                    }
                })
            }else if(major==null && sub==null && faculty==null){
                // academic and semester and dept
                let sql=`SELECT * FROM ${rows[i].table_name} as row_table_name inner join data_sub_report_type as sub_type on row_table_name.event_name = sub_type.table_name inner join data_major_report_type as major_type on sub_type.major_report_id= major_type.major_report_id where row_table_name.acdyr_id=? and row_table_name.sem_id=? and row_table_name.dept_id = ?;`
                base.query(sql,[req.params.academic,req.params.semester,req.params.dept],(err,temp)=>{
                    if(err){
                        res.status(500).json({error:err.message})
                        return
                    }
                    else if(temp.length==0){
                        res.status(201).json({error:"No matches found"})
                        return
                    }
                    for(let i=0;i<temp.length;i++){
                        resultArray.push(temp)
                    }
                })
            }else if(academic==null && sub==null && faculty==null){
                // semester and dept and major
                let sql=`SELECT * FROM ${rows[i].table_name} as row_table_name inner join data_sub_report_type as sub_type on row_table_name.event_name = sub_type.table_name inner join data_major_report_type as major_type on sub_type.major_report_id= major_type.major_report_id where row_table_name.sem_id=? and row_table_name.dept_id=? and major_type.major_report_id = ?;`
                base.query(sql,[req.params.semester,req.params.dept,req.params.major],(err,temp)=>{
                    if(err){
                        res.status(500).json({error:err.message})
                        return
                    }
                    else if(temp.length==0){
                        res.status(201).json({error:"No matches found"})
                        return
                    }
                    for(let i=0;i<temp.length;i++){
                        resultArray.push(temp)
                    }
                })
            }else if(academic==null && semester==null && faculty==null){
                // dept and major and sub
                let sql=`SELECT * FROM ${rows[i].table_name} as row_table_name inner join data_sub_report_type as sub_type on row_table_name.event_name = sub_type.table_name inner join data_major_report_type as major_type on sub_type.major_report_id= major_type.major_report_id where row_table_name.dept_id=? and major_type.major_report_id=? and sub_type.sub_report_id = ?;`
                base.query(sql,[req.params.dept,req.params.major,req.params.sub],(err,temp)=>{
                    if(err){
                        res.status(500).json({error:err.message})
                        return
                    }
                    else if(temp.length==0){
                        res.status(201).json({error:"No matches found"})
                        return
                    }
                    for(let i=0;i<temp.length;i++){
                        resultArray.push(temp)
                    }
                })
            }else if(academic==null && semester==null && dept==null){
                // major and sub and faculty
                let sql=`SELECT * FROM ${rows[i].table_name} as row_table_name inner join data_sub_report_type as sub_type on row_table_name.event_name = sub_type.table_name inner join data_major_report_type as major_type on sub_type.major_report_id= major_type.major_report_id where major_type.major_report_id=? and sub_type.sub_report_id=? and row_table_name.event_coordinator like ?;`
                base.query(sql,[req.params.major,req.params.sub,req.params.faculty],(err,temp)=>{
                    if(err){
                        res.status(500).json({error:err.message})
                        return
                    }
                    else if(temp.length==0){
                        res.status(201).json({error:"No matches found"})
                        return
                    }
                    for(let i=0;i<temp.length;i++){
                        resultArray.push(temp)
                    }
                })
            }else if(dept==null && major==null && sub==null){
                // academic and semester and faculty
                let sql=`SELECT * FROM ${rows[i].table_name} as row_table_name inner join data_sub_report_type as sub_type on row_table_name.event_name = sub_type.table_name inner join data_major_report_type as major_type on sub_type.major_report_id= major_type.major_report_id where row_table_name.acdyr_id=? and row_table_name.sem_id=? and row_table_name.event_coordinator like ?;`
                base.query(sql,[req.params.academic,req.params.semester,req.params.faculty],(err,temp)=>{
                    if(err){
                        res.status(500).json({error:err.message})
                        return
                    }
                    else if(temp.length==0){
                        res.status(201).json({error:"No matches found"})
                        return
                    }
                    for(let i=0;i<temp.length;i++){
                        resultArray.push(temp)
                    }
                })
            }else if(semester==null && dept==null && major==null){
                // academic and sub and faculty
                let sql=`SELECT * FROM ${rows[i].table_name} as row_table_name inner join data_sub_report_type as sub_type on row_table_name.event_name = sub_type.table_name inner join data_major_report_type as major_type on sub_type.major_report_id= major_type.major_report_id where row_table_name.acdyr_id=? and sub_type.sub_report_id=? and row_table_name.event_coordinator like ?;`
                base.query(sql,[req.params.academic,req.params.sub,req.params.faculty],(err,temp)=>{
                    if(err){
                        res.status(500).json({error:err.message})
                        return
                    }
                    else if(temp.length==0){
                        res.status(201).json({error:"No matches found"})
                        return
                    }
                    for(let i=0;i<temp.length;i++){
                        resultArray.push(temp)
                    }
                })
            }else if(sub==null && faculty==null){
                // academic and semester and dept and major
                let sql=`SELECT * FROM ${rows[i].table_name} as row_table_name inner join data_sub_report_type as sub_type on row_table_name.event_name = sub_type.table_name inner join data_major_report_type as major_type on sub_type.major_report_id= major_type.major_report_id where row_table_name.acdyr_id=? and row_table_name.sem_id=? and row_table_name.dept_id = ? and major_type.major_report_id=?;`
                base.query(sql,[req.params.academicr,eq.params.semester,req.params.dept,req.params.major],(err,temp)=>{
                    if(err){
                        res.status(500).json({error:err.message})
                        return
                    }
                    else if(temp.length==0){
                        res.status(201).json({error:"No matches found"})
                        return
                    }
                    for(let i=0;i<temp.length;i++){
                        resultArray.push(temp)
                    }
                })
            }else if(academic==null && faculty==null){
                // semester and dept and major and sub
                let sql=`SELECT * FROM ${rows[i].table_name} as row_table_name inner join data_sub_report_type as sub_type on row_table_name.event_name = sub_type.table_name inner join data_major_report_type as major_type on sub_type.major_report_id= major_type.major_report_id where row_table_name.sem_id=? and row_table_name.dept_id = ? and major_type.major_report_id=? and sub_type.sub_report_type=?;`
                base.query(sql,[req.params.semester,req.params.dept,req.params.major,req.params.sub],(err,temp)=>{
                    if(err){
                        res.status(500).json({error:err.message})
                        return
                    }
                    else if(temp.length==0){
                        res.status(201).json({error:"No matches found"})
                        return
                    }
                    for(let i=0;i<temp.length;i++){
                        resultArray.push(temp)
                    }
                })
            }else if(academic==null && semester==null){
                // dept and major and sub and faculty
                let sql=`SELECT * FROM ${rows[i].table_name} as row_table_name inner join data_sub_report_type as sub_type on row_table_name.event_name = sub_type.table_name inner join data_major_report_type as major_type on sub_type.major_report_id= major_type.major_report_id where row_table_name.dept_id=? and major_type.major_report_id = ? and sub_type.sub_report_id=? and row_table_name.event_coordinator like ?;`
                base.query(sql,[req.params.dept,req.params.major,req.params.sub,req.params.faculty],(err,temp)=>{
                    if(err){
                        res.status(500).json({error:err.message})
                        return
                    }
                    else if(temp.length==0){
                        res.status(201).json({error:"No matches found"})
                        return
                    }
                    for(let i=0;i<temp.length;i++){
                        resultArray.push(temp)
                    }
                })
            }else if(semester==null && dept==null){
                // academic and major and sub and faculty
                let sql=`SELECT * FROM ${rows[i].table_name} as row_table_name inner join data_sub_report_type as sub_type on row_table_name.event_name = sub_type.table_name inner join data_major_report_type as major_type on sub_type.major_report_id= major_type.major_report_id where row_table_name.acdyr_id=? and major_type.major_report_id = ? and sub_type.sub_report_id=? and row_table_name.event_coordinator like ?;`
                base.query(sql,[req.params.academic,req.params.major,req.params.sub,req.params.faculty],(err,temp)=>{
                    if(err){
                        res.status(500).json({error:err.message})
                        return
                    }
                    else if(temp.length==0){
                        res.status(201).json({error:"No matches found"})
                        return
                    }
                    for(let i=0;i<temp.length;i++){
                        resultArray.push(temp)
                    }
                })
            }else if(dept==null && major==null){
                // academic and semester and sub and faculty
                let sql=`SELECT * FROM ${rows[i].table_name} as row_table_name inner join data_sub_report_type as sub_type on row_table_name.event_name = sub_type.table_name inner join data_major_report_type as major_type on sub_type.major_report_id= major_type.major_report_id where row_table_name.acdyr_id=? and row_table_name.sem_id = ? and sub_type.sub_report_id=? and row_table_name.event_coordinator like ?;`
                base.query(sql,[req.params.academic,req.params.semester,req.params.sub,req.params.faculty],(err,temp)=>{
                    if(err){
                        res.status(500).json({error:err.message})
                        return
                    }
                    else if(temp.length==0){
                        res.status(201).json({error:"No matches found"})
                        return
                    }
                    for(let i=0;i<temp.length;i++){
                        resultArray.push(temp)
                    }
                })
            }else if(major==null && sub==null){
                // academic and semester and dept and faculty
                let sql=`SELECT * FROM ${rows[i].table_name} as row_table_name inner join data_sub_report_type as sub_type on row_table_name.event_name = sub_type.table_name inner join data_major_report_type as major_type on sub_type.major_report_id= major_type.major_report_id where row_table_name.acdyr_id=? and row_table_name.sem_id = ? and row_table_name.dept_id=? and row_table_name.event_coordinator like ?;`
                base.query(sql,[req.params.academic,req.params.semester,req.params.dept,req.params.faculty],(err,temp)=>{
                    if(err){
                        res.status(500).json({error:err.message})
                        return
                    }
                    else if(temp.length==0){
                        res.status(201).json({error:"No matches found"})
                        return
                    }
                    for(let i=0;i<temp.length;i++){
                        resultArray.push(temp)
                    }
                })
            }else if(faculty==null){
                // academic and semester and dept and major and sub
                let sql=`SELECT * FROM ${rows[i].table_name} as row_table_name inner join data_sub_report_type as sub_type on row_table_name.event_name = sub_type.table_name inner join data_major_report_type as major_type on sub_type.major_report_id= major_type.major_report_id where row_table_name.acdyr_id=? and row_table_name.sem_id = ? and row_table_name.dept_id=? and major_type.major_report_type=? and sub_type.sub_report_id=?;`
                base.query(sql,[req.params.academic,req.params.semester,req.params.dept,req.params.major,req.params.sub],(err,temp)=>{
                    if(err){
                        res.status(500).json({error:err.message})
                        return
                    }
                    else if(temp.length==0){
                        res.status(201).json({error:"No matches found"})
                        return
                    }
                    for(let i=0;i<temp.length;i++){
                        resultArray.push(temp)
                    }
                })
            }else if(academic==null){
                // semester and dept and major and sub and faculty
                let sql=`SELECT * FROM ${rows[i].table_name} as row_table_name inner join data_sub_report_type as sub_type on row_table_name.event_name = sub_type.table_name inner join data_major_report_type as major_type on sub_type.major_report_id= major_type.major_report_id where row_table_name.sem_id = ? and row_table_name.dept_id=? and major_type.major_report_type=? and sub_type.sub_report_id=? and row_table_name.event_coordinator like ?;`
                base.query(sql,[req.params.semester,req.params.dept,req.params.major,req.params.sub,req.params.faculty],(err,temp)=>{
                    if(err){
                        res.status(500).json({error:err.message})
                        return
                    }
                    else if(temp.length==0){
                        res.status(201).json({error:"No matches found"})
                        return
                    }
                    for(let i=0;i<temp.length;i++){
                        resultArray.push(temp)
                    }
                })
            }else if(semester==null){
                // academic and dept and major and sub and faculty
                let sql=`SELECT * FROM ${rows[i].table_name} as row_table_name inner join data_sub_report_type as sub_type on row_table_name.event_name = sub_type.table_name inner join data_major_report_type as major_type on sub_type.major_report_id= major_type.major_report_id where row_table_name.acdyr_id = ? and row_table_name.dept_id=? and major_type.major_report_type=? and sub_type.sub_report_id=? and row_table_name.event_coordinator like ?;`
                base.query(sql,[req.params.academic,req.params.dept,req.params.major,req.params.sub,req.params.faculty],(err,temp)=>{
                    if(err){
                        res.status(500).json({error:err.message})
                        return
                    }
                    else if(temp.length==0){
                        res.status(201).json({error:"No matches found"})
                        return
                    }
                    for(let i=0;i<temp.length;i++){
                        resultArray.push(temp)
                    }
                })
            }else if(dept==null){
                // academic and sem and major and sub and faculty
                let sql=`SELECT * FROM ${rows[i].table_name} as row_table_name inner join data_sub_report_type as sub_type on row_table_name.event_name = sub_type.table_name inner join data_major_report_type as major_type on sub_type.major_report_id= major_type.major_report_id where row_table_name.acdyr_id = ? and row_table_name.sem_id=? and major_type.major_report_type=? and sub_type.sub_report_id=? and row_table_name.event_coordinator like ?;`
                base.query(sql,[req.params.academic,req.params.semester,req.params.major,req.params.sub,req.params.faculty],(err,temp)=>{
                    if(err){
                        res.status(500).json({error:err.message})
                        return
                    }
                    else if(temp.length==0){
                        res.status(201).json({error:"No matches found"})
                        return
                    }
                    for(let i=0;i<temp.length;i++){
                        resultArray.push(temp)
                    }
                })
            }else if(major==null){
                // academic and sem and dept and sub and faculty
                let sql=`SELECT * FROM ${rows[i].table_name} as row_table_name inner join data_sub_report_type as sub_type on row_table_name.event_name = sub_type.table_name inner join data_major_report_type as major_type on sub_type.major_report_id= major_type.major_report_id where row_table_name.acdyr_id = ? and row_table_name.sem_id=? and row_table_name.dept_id=? and sub_type.sub_report_id=? and row_table_name.event_coordinator like ?;`
                base.query(sql,[req.params.academic,req.params.semester,req.params.dept,req.params.sub,req.params.faculty],(err,temp)=>{
                    if(err){
                        res.status(500).json({error:err.message})
                        return
                    }
                    else if(temp.length==0){
                        res.status(201).json({error:"No matches found"})
                        return
                    }
                    for(let i=0;i<temp.length;i++){
                        resultArray.push(temp)
                    }
                })
            }else if(sub==null){
                // academic and semester and dept and major and faculty
                let sql=`SELECT * FROM ${rows[i].table_name} as row_table_name inner join data_sub_report_type as sub_type on row_table_name.event_name = sub_type.table_name inner join data_major_report_type as major_type on sub_type.major_report_id= major_type.major_report_id where row_table_name.acdyr_id = ? and row_table_name.sem_id=? and row_table_name.dept_id=? and major_type.major_report_id=? and row_table_name.event_coordinator like ?;`
                base.query(sql,[req.params.academic,req.params.semester,req.params.dept,req.params.major,req.params.faculty],(err,temp)=>{
                    if(err){
                        res.status(500).json({error:err.message})
                        return
                    }
                    else if(temp.length==0){
                        res.status(201).json({error:"No matches found"})
                        return
                    }
                    for(let i=0;i<temp.length;i++){
                        resultArray.push(temp)
                    }
                })
            }else{
                res.status(201).json({"error":err.message})
            }
        }
        res.status(200).json("completed")
    })
})

route.get('/getAcdYrWithSubType/:subId', async (req, res) => {
    const acdYrResults = [];
    try {
        const sql1 = 'SELECT acd_status FROM data_sub_report_type WHERE sub_report_id = ?';
        const rows = await new Promise((resolve, reject) => {
            base.query(sql1, [req.params.subId], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });

        if (rows.length === 0) {
            return res.status(201).json({ error: 'No matches found' });
        }

        const definedYr = rows[0].acd_status.split(',');

        for (let i = 0; i < definedYr.length; i++) {
            const sql2 = 'SELECT acd_yr FROM predefined_academic_year WHERE acd_status = ?';
            const results = await new Promise((resolve, reject) => {
                base.query(sql2, [definedYr[i]], (err, results) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(results);
                    }
                });
            });

            if (results.length === 0) {
                return res.status(201).json({ error: 'No matches found' });
            }

            acdYrResults.push(results[0]);
        }

        res.status(200).json(acdYrResults);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

route.get('/getAllReportsAcrossTables/:deptId/:empId', async (req, res) => {
    const dId = req.params.deptId;
    const eId = req.params.empId;
    let receivedReports = [];

    try {
        const rows = await new Promise((resolve, reject) => {
            const sql = 'call checkApprovalFacultyWithEmpId(?, ?)';
            base.query(sql, [dId, eId], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });

        if (rows.length === 0) {
            return res.status(401).json({ message: 'no records found' });
        }
        for (let i = 0; i < rows[0].length; i++) {
            console.log(rows[0][i].levels)
            console.log(rows[0][i].data_table_name)
            if(rows[0][i].levels=="report_lvl1"){
                const name_table = rows[0][i].data_table_name;
                const result = await new Promise((resolve, reject) => {
                    const sql = `select * from ${name_table} where dept_id=? and (report_proposal_status=0 or report_completion_status=0) and final_report_status!=1 and final_report_status!=2`
                    base.query(sql, [dId], (err, result) => {
                        if (err) {
                            reject(err);
                        }
                        else {
                            resolve(result);
                        }
                    });
                });
                if (result.length > 0) {
                    receivedReports.push(result);
                }
            }
            if(rows[0][i].levels=="report_lvl2"){
                const name_table = rows[0][i].data_table_name;
                const result = await new Promise((resolve, reject) => {
                    const sql = `select * from ${name_table} where dept_id=? and (report_proposal_status=1 or report_completion_status=1) and final_report_status!=1 and final_report_status!=2`
                    base.query(sql, [dId], (err, result) => {
                        if (err) {
                            reject(err);
                        }
                        else {
                            resolve(result);
                        }
                    });
                });
                if (result.length > 0) {
                    receivedReports.push(result);
                }
            }
            if(rows[0][i].levels=="report_lvl3"){
                const name_table = rows[0][i].data_table_name;
                const result = await new Promise((resolve, reject) => {
                    const sql = `select * from ${name_table} where dept_id=? and (report_proposal_status=2 or report_completion_status=2) and final_report_status!=1 and final_report_status!=2`
                    base.query(sql, [dId], (err, result) => {
                        if (err) {
                            reject(err);
                        }
                        else {
                            resolve(result);
                        }
                    });
                });
                if (result.length > 0) {
                    receivedReports.push(result);
                }
            }
            if(rows[0][i].levels=="report_lvl4"){
                const name_table = rows[0][i].data_table_name;
                const result = await new Promise((resolve, reject) => {
                    const sql = `select * from ${name_table} where dept_id=? and (report_proposal_status=3 or report_completion_status=3) and final_report_status!=1 and final_report_status!=2`
                    base.query(sql, [dId], (err, result) => {
                        if (err) {
                            reject(err);
                        }
                        else {
                            resolve(result);
                        }
                    });
                });
                if (result.length > 0) {
                    receivedReports.push(result);
                }
            }
            if(rows[0][i].levels=="report_lvl5"){
                const name_table = rows[0][i].data_table_name;
                const result = await new Promise((resolve, reject) => {
                    const sql = `select * from ${name_table} where dept_id=? and (report_proposal_status=4 or report_completion_status=4) and final_report_status!=1 and final_report_status!=2`
                    base.query(sql, [dId], (err, result) => {
                        if (err) {
                            reject(err);
                        }
                        else {
                            resolve(result);
                        }
                    });
                });
                if (result.length > 0) {
                    receivedReports.push(result);
                }
            }
        }

        // console.log(receivedReports);
        res.status(200).json({receivedReports});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = route
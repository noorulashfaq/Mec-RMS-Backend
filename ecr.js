const express = require("express")
const route = express.Router()
const base = require("./db")

route.get('/find/:deptId',async(req,res)=>{
    const dId=req.params.deptId
    const sql=`select faculty_id, faculty_name from data_faculties where faculty_dept=? and not faculty_desig in(403,404)`
    base.query(sql,[dId],(err,rows)=>{
        if(err){
            res.status(500).json({error:err.message})
            return
        }
        if(rows.length==0){
            res.status(404).json({error:"No faculties"})
            return
        }
        res.status(200).json({rows})
    })
})

route.post('/ecrProposal/:tableName',async(req,res)=>{
    // receive the request from client
    const{report_id,event_name,event_title,event_organizer,event_sponsor,event_date,event_venue,guest_name,guest_designation,guest_address,guest_phone_number,guest_email,student_count,faculty_count,others_count,event_budget,event_coordinator,coordinator_emp_id,coordinator_phone_number,coordinator_designation,event_date_from,event_date_to,acdyr_id,dept_id,sem_id}=req.body
    sql=`insert into ${req.params.tableName}(report_id,event_name,event_title,event_organizer,event_sponsor,event_date,event_venue,guest_name,guest_designation,guest_address,guest_phone_number,guest_email,student_count,faculty_count,others_count,event_budget,event_coordinator,coordinator_emp_id,coordinator_phone_number,coordinator_designation,event_date_from,event_date_to,acdyr_id,dept_id,sem_id,report_proposal_status,final_proposal_status,report_completion_status,final_report_status) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,0,0,0,0)`
        base.query(sql,[report_id,event_name,event_title,event_organizer,event_sponsor,event_date,event_venue,guest_name,guest_designation,guest_address,guest_phone_number,guest_email,student_count,faculty_count,others_count,event_budget,event_coordinator,coordinator_emp_id,coordinator_phone_number,coordinator_designation,event_date_from,event_date_to,acdyr_id,dept_id,sem_id],(err,ack)=>{
            if(err){
                res.status(500).json({error:err.message})
                return
            }
            res.status(200).json({message:"Workshop Proposal has sent"})
        })
})

route.get('/authorities/:deptId',async(req,res)=>{
    const id=req.params.deptId
    const sql="call GetNonNullColumnsForDeptId(?)"
    base.query(sql,[id],(err,row)=>{
        if(err){
            res.status(500).json({error:err.message})
            return
        }
        if(row.length==0){
            res.status(404).json({message:"No ECR Workshop matched"})
            return
        }
        //res.status(200).json({row})
        let count=0
        let obj={}
        for (let index = 0; index < row[0].length; index++) {
                console.log(row[0][index].column_name+" "+row[0][index].column_value)
                let key=row[0][index].column_name
                let value=row[0][index].column_value
                obj[key]=value
                count++;
            //}
        }
        obj['dept_id']=id
        console.log(obj+" "+count)
        res.status(200).json({obj})
    })
})

route.get('/loadforlevel1/:tableName/:deptId/:empId',async(req,res)=>{
    const dId=req.params.deptId
    const eId=req.params.empId
    let sql="select report_lvl1 from data_approval where dept_id=? and report_lvl1 like ?"
    base.query(sql,[dId,'%'+eId+'%'],(err,row)=>{
        if(err){
            res.status(500).json({error:err.message})
            return
        }
        if(row.length==0){
            res.status(404).json({error:"No matches"})
            return
        }
        sql=`select * from ${req.params.tableName} where report_proposal_status=0 and final_proposal_status=0 and lvl_1_proposal_sign is null and report_completion_status=0 and final_report_status=0 and dept_id=?`
        base.query(sql,[dId],(err,rows)=>{
            if(err){res.status(500).json({error:err.message});return;}
            if(row.length==0){res.status(404).json({error:"Nothing to show"})}
            res.status(200).json({rows})
        })
    })
})


route.put('/acknowledgelevel1/:tableName/:deptId/:empId/:report_id',async(req,res)=>{
    const dId=req.params.deptId
    const eId=req.params.empId
    const rId=req.params.report_id
    let sql = `select * from data_approval where dept_id=? and data_table_name="${req.params.tableName}"`
    base.query(sql,[dId],(err,rows)=>{
        if(err){
            res.status(500).json({error:err.message})
            return
        }
        else if(rows.length==0){
            res.status(201).json({error:"No matches found"})
            return
        }
        // res.status(200).json({rows})
        console.log("Hello"+rows[0].report_lvl2)
        if(rows[0].report_lvl2==null){
            console.log("HEY")
            let sql=`select report_id from ${req.params.tableName} where dept_id=? and report_proposal_status=0 and final_proposal_status=0 and final_report_status=0 and report_id=?`
            base.query(sql,[dId,rId],(err,row)=>{
            if(err){
                res.status(500).json({error:err.message})
                return
            }
            if(row.length==0){
                res.status(404).json({error:"No records to acknowledge"})
                return
            }
        //no need
            console.log(row)
            sql="call GetNonNullColumnsForDeptId(?)"
            base.query(sql,[dId],(err,rows)=>{
            if(err){
                res.status(500).json({error:err.message})
                return
            }
            if(rows.length==0){
                res.status(404).json({error:"No records available to acknowledge"})
                return
            }
            console.log(rows[0])
            let count=rows.length
            // for (let index = 0; index < rows.length; index++)
            // {count++;}
            console.log(count)
            //upto this
            console.log(rows[0][1].column_value.includes(eId))
            if(rows[0][1].column_value.includes(eId)){
                console.log("In")
                sql=`update ${req.params.tableName} set lvl_1_proposal_sign=?, report_proposal_status=report_proposal_status+1, final_proposal_status=final_proposal_status+1 where dept_id=? and report_proposal_status=1 and report_completion_status=0 and final_report_status=0 and report_id=?`
                base.query(sql,[eId,dId,rId],(err,result)=>{
                    if(err){
                        console.log("111")
                        res.status(500).json({error:err.message})
                        return
                    }
                    if(result.affectedRows==0){
                        console.log("222")
                        res.status(404).json({error:"Event hasn't completed yet"})
                        return
                    }
                    console.log("333")
                    res.status(200).json({message:"acknowledged by level"})
                })
            }
            else{
                res.status(404).json({error:"Forbidden access"})
            }
        })
    })
        }else{
            console.log("hiiiiiiiiii")
            let sql=`select report_id from ${req.params.tableName} where dept_id=? and report_proposal_status=0 and final_report_status=0 and report_id=?`
    base.query(sql,[dId,rId],(err,row)=>{
        if(err){
            res.status(500).json({error:err.message})
            return
        }
        if(row.length==0){
            res.status(404).json({error:"No records to acknowledge"})
            return
        }
        //no need
        sql="call GetNonNullColumnsForDeptId(?)"
        base.query(sql,[dId],(err,rows)=>{
            if(err){
                res.status(500).json({error:err.message})
                return
            }
            if(rows.length==0){
                res.status(404).json({error:"No records available to acknowledge"})
                return
            }
            console.log(rows[0])
            let count=rows.length
            // for (let index = 0; index < rows.length; index++)
            // {count++;}
            console.log(count)
            //upto this
            console.log(rows[0][0].column_value)
            if(rows[0][0].column_value.includes(eId)){
                sql=`update ${req.params.tableName} set lvl_1_proposal_sign=?, report_proposal_status=report_proposal_status+1 where dept_id=? and report_proposal_status=0 and report_completion_status=0 and final_report_status=0 and final_proposal_status=0 and report_id=?`
                base.query(sql,[eId,dId,rId],(err,result)=>{
                    if(err){
                        res.status(500).json({error:err.message})
                        return
                    }
                    if(result.affectedRows==0){
                        res.status(404).json({error:"Event hasn't completed yet"})
                        return
                    }
                    res.status(200).json({message:"acknowledged by level"})
                })
            }
            else{
                res.status(404).json({error:"Forbidden access"})
            }
        })
    })
        }
    })
})

route.get('/loadforlevel2/:tableName/:deptId/:empId',async(req,res)=>{
    const dId=req.params.deptId
    const eId=req.params.empId
    let sql="select report_lvl2 from data_approval where dept_id=? and report_lvl2 like ?"
    base.query(sql,[dId,'%'+eId+'%'],(err,row)=>{
        if(err){
            res.status(500).json({error:err.message})
            return
        }
        if(row.length==0){
            res.status(404).json({error:"No matches"})
            return
        }
        sql=`select * from ${req.params.tableName} where report_proposal_status=1 and lvl_2_proposal_sign is null and report_completion_status=0 and final_report_status=0 and dept_id=?`
        base.query(sql,[dId],(err,rows)=>{
            if(err){res.status(500).json({error:err.message});return;}
            if(row.length==0){res.status(404).json({error:"Nothing to show"})}
            res.status(200).json({rows})
        })
    })
})

route.put('/acknowledgelevel2/:tableName/:deptId/:empId/:report_id',async(req,res)=>{
    const dId=req.params.deptId
    const eId=req.params.empId
    const rId=req.params.report_id
    let sql = `select * from data_approval where dept_id=? and data_table_name="${req.params.tableName}"`
    base.query(sql,[dId],(err,rows)=>{
        if(err){
            res.status(500).json({error:err.message})
            return
        }
        else if(rows.length==0){
            res.status(201).json({error:"No matches found"})
            return
        }
        // res.status(200).json({rows})
        console.log("Hello"+rows[0].report_lvl3)
        if(rows[0].report_lvl3==null){
            console.log("HEY")
            let sql=`select report_id from ${req.params.tableName} where dept_id=? and report_proposal_status=1 and final_proposal_status=0 and final_report_status=0 and report_id=?`
            base.query(sql,[dId,rId],(err,row)=>{
            if(err){
                res.status(500).json({error:err.message})
                return
            }
            if(row.length==0){
                res.status(404).json({error:"No records to acknowledge"})
                return
            }
        //no need
            console.log(row)
            sql="call GetNonNullColumnsForDeptId(?)"
            base.query(sql,[dId],(err,rows)=>{
            if(err){
                res.status(500).json({error:err.message})
                return
            }
            if(rows.length==0){
                res.status(404).json({error:"No records available to acknowledge"})
                return
            }
            console.log(rows[0])
            let count=rows.length
            // for (let index = 0; index < rows.length; index++)
            // {count++;}
            console.log(count)
            //upto this
            console.log(rows[0][1].column_value.includes(eId))
            if(rows[0][1].column_value.includes(eId)){
                console.log("In")
                sql=`update ${req.params.tableName} set lvl_2_proposal_sign=?, report_proposal_status=report_proposal_status+1, final_proposal_status=final_proposal_status+1 where dept_id=? and report_proposal_status=1 and report_completion_status=0 and final_report_status=0 and report_id=?`
                base.query(sql,[eId,dId,rId],(err,result)=>{
                    if(err){
                        console.log("111")
                        res.status(500).json({error:err.message})
                        return
                    }
                    if(result.affectedRows==0){
                        console.log("222")
                        res.status(404).json({error:"Event hasn't completed yet"})
                        return
                    }
                    console.log("333")
                    res.status(200).json({message:"acknowledged by level"})
                })
            }
            else{
                res.status(404).json({error:"Forbidden access"})
            }
        })
    })
        }else{
            console.log("hiiiiiiiiii")
            let sql=`select report_id from ${req.params.tableName} where dept_id=? and report_proposal_status=1 and final_report_status=0 and report_id=?`
    base.query(sql,[dId,rId],(err,row)=>{
        if(err){
            res.status(500).json({error:err.message})
            return
        }
        if(row.length==0){
            res.status(404).json({error:"No records to acknowledge"})
            return
        }
        //no need
        sql="call GetNonNullColumnsForDeptId(?)"
        base.query(sql,[dId],(err,rows)=>{
            if(err){
                res.status(500).json({error:err.message})
                return
            }
            if(rows.length==0){
                res.status(404).json({error:"No records available to acknowledge"})
                return
            }
            console.log(rows[0])
            let count=rows.length
            // for (let index = 0; index < rows.length; index++)
            // {count++;}
            console.log(count)
            //upto this
            if(rows[0][1].column_value.includes(eId)){
                sql=`update ${req.params.tableName} set lvl_2_proposal_sign=?, report_proposal_status=report_proposal_status+1 where dept_id=? and report_proposal_status=1 and report_completion_status=0 and final_report_status=0 and final_proposal_status=0 and report_id=?`
                base.query(sql,[eId,dId,rId],(err,result)=>{
                    if(err){
                        res.status(500).json({error:err.message})
                        return
                    }
                    if(result.affectedRows==0){
                        res.status(404).json({error:"Event hasn't completed yet"})
                        return
                    }
                    res.status(200).json({message:"acknowledged by level"})
                })
            }
            else{
                res.status(404).json({error:"Forbidden access"})
            }
        })
    })
        }
    })
})

route.get('/loadforlevel3/:tableName/:deptId/:empId',async(req,res)=>{
    const dId=req.params.deptId
    const eId=req.params.empId
    let sql="select report_lvl3 from data_approval where dept_id=? and report_lvl3 like ?"
    base.query(sql,[dId,'%'+eId+'%'],(err,row)=>{
        if(err){
            res.status(500).json({error:err.message})
            return
        }
        if(row.length==0){
            res.status(404).json({error:"No matches"})
            return
        }
        sql=`select * from ${req.params.tableName} where report_proposal_status=2 and lvl_3_proposal_sign is null and report_completion_status=0 and final_report_status=0 and dept_id=?`
        base.query(sql,[dId],(err,rows)=>{
            if(err){res.status(500).json({error:err.message});return;}
            if(row.length==0){res.status(404).json({error:"Nothing to show"})}
            res.status(200).json({rows})
        })
    })
})

route.put('/acknowledgelevel3/:tableName/:deptId/:empId/:report_id',async(req,res)=>{
    const dId=req.params.deptId
    const eId=req.params.empId
    const rId=req.params.report_id
    let sql = `select * from data_approval where dept_id=? and data_table_name="${req.params.tableName}"`
    base.query(sql,[dId],(err,rows)=>{
        if(err){
            res.status(500).json({error:err.message})
            return
        }
        else if(rows.length==0){
            res.status(201).json({error:"No matches found"})
            return
        }
        // res.status(200).json({rows})
        console.log("Hello"+rows[0].report_lvl4)
        if(rows[0].report_lvl4==null){
            console.log("HEY")
            let sql=`select report_id from ${req.params.tableName} where dept_id=? and report_proposal_status=2 and final_proposal_status=0 and final_report_status=0 and report_id=?`
            base.query(sql,[dId,rId],(err,row)=>{
            if(err){
                res.status(500).json({error:err.message})
                return
            }
            if(row.length==0){
                res.status(404).json({error:"No records to acknowledge"})
                return
            }
        //no need
            console.log(row)
            sql="call GetNonNullColumnsForDeptId(?)"
            base.query(sql,[dId],(err,rows)=>{
            if(err){
                res.status(500).json({error:err.message})
                return
            }
            if(rows.length==0){
                res.status(404).json({error:"No records available to acknowledge"})
                return
            }
            console.log(rows[0])
            let count=rows.length
            // for (let index = 0; index < rows.length; index++)
            // {count++;}
            console.log(count)
            //upto this
            console.log(rows[0][2].column_value.includes(eId))
            if(rows[0][2].column_value.includes(eId)){
                console.log("In")
                sql=`update ${req.params.tableName} set lvl_3_proposal_sign=?, report_proposal_status=report_proposal_status+1, final_proposal_status=final_proposal_status+1 where dept_id=? and report_proposal_status=2 and report_completion_status=0 and final_report_status=0 and report_id=?`
                base.query(sql,[eId,dId,rId],(err,result)=>{
                    if(err){
                        console.log("111")
                        res.status(500).json({error:err.message})
                        return
                    }
                    if(result.affectedRows==0){
                        console.log("222")
                        res.status(404).json({error:"Event hasn't completed yet"})
                        return
                    }
                    console.log("333")
                    res.status(200).json({message:"acknowledged by level"})
                })
            }
            else{
                res.status(404).json({error:"Forbidden access"})
            }
        })
    })
        }else{
            console.log("hiiiiiiiiii")
            let sql=`select report_id from ${req.params.tableName} where dept_id=? and report_proposal_status=2 and final_report_status=0 and report_id=?`
    base.query(sql,[dId,rId],(err,row)=>{
        if(err){
            res.status(500).json({error:err.message})
            return
        }
        if(row.length==0){
            res.status(404).json({error:"No records to acknowledge"})
            return
        }
        //no need
        sql="call GetNonNullColumnsForDeptId(?)"
        base.query(sql,[dId],(err,rows)=>{
            if(err){
                res.status(500).json({error:err.message})
                return
            }
            if(rows.length==0){
                res.status(404).json({error:"No records available to acknowledge"})
                return
            }
            console.log(rows[0])
            let count=rows.length
            // for (let index = 0; index < rows.length; index++)
            // {count++;}
            console.log(count)
            //upto this
            if(rows[0][2].column_value.includes(eId)){
                sql=`update ${req.params.tableName} set lvl_3_proposal_sign=?, report_proposal_status=report_proposal_status+1 where dept_id=? and report_proposal_status=2 and final_proposal_status=0 and report_completion_status=0 and final_report_status=0 and report_id=?`
                base.query(sql,[eId,dId,rId],(err,result)=>{
                    if(err){
                        res.status(500).json({error:err.message})
                        return
                    }
                    if(result.affectedRows==0){
                        res.status(404).json({error:"Event hasn't completed yet"})
                        return
                    }
                    res.status(200).json({message:"acknowledged by level"})
                })
            }
            else{
                res.status(404).json({error:"Forbidden access"})
            }
        })
    })
        }
    })
})

route.get('/loadforlevel4/:tableName/:deptId/:empId',async(req,res)=>{
    const dId=req.params.deptId
    const eId=req.params.empId
    let sql="select report_lvl4 from data_approval where dept_id=? and report_lvl4 like ?"
    base.query(sql,[dId,'%'+eId+'%'],(err,row)=>{
        if(err){
            res.status(500).json({error:err.message})
            return
        }
        if(row.length==0){
            res.status(404).json({error:"No matches"})
            return
        }
        sql=`select * from ${req.params.tableName} where report_proposal_status=3 and lvl_4_proposal_sign is null and report_completion_status=0 and final_report_status=0 and dept_id=?`
        base.query(sql,[dId],(err,rows)=>{
            if(err){res.status(500).json({error:err.message});return;}
            if(row.length==0){res.status(404).json({error:"Nothing to show"})}
            res.status(200).json({rows})
        })
    })
})

route.put('/acknowledgelevel4/:tableName/:deptId/:empId/:report_id',async(req,res)=>{
    const dId=req.params.deptId
    const eId=req.params.empId
    const rId=req.params.report_id
    let sql = `select * from data_approval where dept_id=? and data_table_name="${req.params.tableName}"`
    base.query(sql,[dId],(err,rows)=>{
        if(err){
            res.status(500).json({error:err.message})
            return
        }
        else if(rows.length==0){
            res.status(201).json({error:"No matches found"})
            return
        }
        // res.status(200).json({rows})
        console.log("Hello"+rows[0].report_lvl4)
        if(rows[0].report_lvl5==null){
            console.log("HEY")
            let sql=`select report_id from ${req.params.tableName} where dept_id=? and report_proposal_status=3 and final_proposal_status=0 and final_report_status=0 and report_id=?`
            base.query(sql,[dId,rId],(err,row)=>{
            if(err){
                res.status(500).json({error:err.message})
                return
            }
            if(row.length==0){
                res.status(404).json({error:"No records to acknowledge"})
                return
            }
        //no need
            console.log(row)
            sql="call GetNonNullColumnsForDeptId(?)"
            base.query(sql,[dId],(err,rows)=>{
            if(err){
                res.status(500).json({error:err.message})
                return
            }
            if(rows.length==0){
                res.status(404).json({error:"No records available to acknowledge"})
                return
            }
            console.log(rows[0])
            let count=rows.length
            // for (let index = 0; index < rows.length; index++)
            // {count++;}
            console.log(count)
            //upto this
            console.log(rows[0][3].column_value.includes(eId))
            if(rows[0][3].column_value.includes(eId)){
                console.log("In")
                sql=`update ${req.params.tableName} set lvl_4_proposal_sign=?, report_proposal_status=report_proposal_status+1, final_proposal_status=final_proposal_status+1 where dept_id=? and report_proposal_status=3 and report_completion_status=0 and final_report_status=0 and report_id=?`
                base.query(sql,[eId,dId,rId],(err,result)=>{
                    if(err){
                        console.log("111")
                        res.status(500).json({error:err.message})
                        return
                    }
                    if(result.affectedRows==0){
                        console.log("222")
                        res.status(404).json({error:"Event hasn't completed yet"})
                        return
                    }
                    console.log("333")
                    res.status(200).json({message:"acknowledged by level"})
                })
            }
            else{
                res.status(404).json({error:"Forbidden access"})
            }
        })
    })
        }else{
            console.log("hiiiiiiiiii")
            let sql=`select report_id from ${req.params.tableName} where dept_id=? and report_proposal_status=3 and final_report_status=0 and report_id=?`
    base.query(sql,[dId,rId],(err,row)=>{
        if(err){
            res.status(500).json({error:err.message})
            return
        }
        if(row.length==0){
            res.status(404).json({error:"No records to acknowledge"})
            return
        }
        //no need
        sql="call GetNonNullColumnsForDeptId(?)"
        base.query(sql,[dId],(err,rows)=>{
            if(err){
                res.status(500).json({error:err.message})
                return
            }
            if(rows.length==0){
                res.status(404).json({error:"No records available to acknowledge"})
                return
            }
            console.log(rows[0])
            let count=rows.length
            // for (let index = 0; index < rows.length; index++)
            // {count++;}
            console.log(count)
            //upto this
            if(rows[0][3].column_value.includes(eId)){
                sql=`update ${req.params.tableName} set lvl_4_proposal_sign=?, report_proposal_status=report_proposal_status+1 where dept_id=? and report_proposal_status=3 and final_proposal_status=0 and report_completion_status=0 and final_report_status=0 and report_id=?`
                base.query(sql,[eId,dId,rId],(err,result)=>{
                    if(err){
                        res.status(500).json({error:err.message})
                        return
                    }
                    if(result.affectedRows==0){
                        res.status(404).json({error:"Event hasn't completed yet"})
                        return
                    }
                    res.status(200).json({message:"acknowledged by level"})
                })
            }
            else{
                res.status(404).json({error:"Forbidden access"})
            }
        })
    })
        }
    })
})
route.get('/loadforlevel5/:tableName/:deptId/:empId',async(req,res)=>{
    const dId=req.params.deptId
    const eId=req.params.empId
    let sql="select report_lvl5 from data_approval where dept_id=? and report_lvl5 like ?"
    base.query(sql,[dId,'%'+eId+'%'],(err,row)=>{
        if(err){
            res.status(500).json({error:err.message})
            return
        }
        if(row.length==0){
            res.status(404).json({error:"No matches"})
            return
        }
        sql=`select * from ${req.params.tableName} where report_proposal_status=4 and lvl_5_proposal_sign is null and report_completion_status=0 and final_report_status=0 and dept_id=?`
        base.query(sql,[dId],(err,rows)=>{
            if(err){res.status(500).json({error:err.message});return;}
            if(row.length==0){res.status(404).json({error:"Nothing to show"})}
            res.status(200).json({rows})
        })
    })
})

route.put('/acknowledgelevel5/:tableName/:deptId/:empId/:report_id',async(req,res)=>{
    const dId=req.params.deptId
    const eId=req.params.empId
    const rId=req.params.report_id
    let sql=`select report_id from ${req.params.tableName} where dept_id=? and report_proposal_status=4 and final_report_status=0 and report_id=?`
    base.query(sql,[dId,rId],(err,row)=>{
        if(err){
            res.status(500).json({error:err.message})
            return
        }
        if(row.length==0){
            res.status(404).json({error:"No records to acknowledge"})
            return
        }
        //no need
        sql="call GetNonNullColumnsForDeptId(?)"
        base.query(sql,[dId],(err,rows)=>{
            if(err){
                res.status(500).json({error:err.message})
                return
            }
            if(rows.length==0){
                res.status(404).json({error:"No records available to acknowledge"})
                return
            }
            console.log(rows[0])
            let count=rows.length
            // for (let index = 0; index < rows.length; index++)
            // {count++;}
            console.log(count)
            //upto this
            if(rows[0][5].column_value.includes(eId)){
                sql=`update ${req.params.tableName} set lvl_5_proposal_sign=?, report_proposal_status=report_proposal_status+1 where dept_id=? and report_proposal_status=4 and report_completion_status=0 and final_report_status=0 and report_id=?`
                base.query(sql,[eId,dId,rId],(err,result)=>{
                    if(err){
                        res.status(500).json({error:err.message})
                        return
                    }
                    if(result.affectedRows==0){
                        res.status(404).json({error:"Event hasn't completed yet"})
                        return
                    }
                    res.status(200).json({message:"acknowledged by level"})
                })
            }
            else{
                res.status(404).json({error:"Forbidden access"})
            }
        })
    })
})

route.get('/loadforCompletion/:deptId/:tableName',async(req,res)=>{
    const dId=req.params.deptId
    let sql=`select * from ${req.params.tableName} where approval_status=2 and is_eve_completed=0 and dept_id=?`
    base.query(sql,[dId],(err,row)=>{
        if(err){
            res.status(500).json({error:err.message})
            return
        }
        if(row.length==0){
            res.status(404).json({error:"No workshop to be approved"})
            return
        }
        res.status(200).json({row})
    })
})

route.put('/ecrCompletion/:report_id/:tableName',async(req,res)=>{
    // receive the request from client
    const{event_photo_1,event_photo_2,event_po,completion_date,completion_hod,completion_principal,pdf,event_duration,event_os,event_time,event_description,event_budget_utilized}=req.body
    sql=`update ${req.params.tableName} set event_photo_1=?, event_photo_2=?, event_po=?, completion_date=?,completion_hod=?, completion_principal=?,pdf=?,event_duration=?, event_os=?, event_time=?, event_description=?, event_budget_utilized=?,approval_status=approval_status+1 where report_id=? and approval_status=2`
        base.query(sql,[event_photo_1,event_photo_2,event_po,completion_date,completion_hod,completion_principal,pdf,event_duration,event_os,event_time,event_description,event_budget_utilized,req.params.report_id],(err,ack)=>{
            if(err){
                res.status(500).json({error:err.message})
                return
            }
            res.status(200).json({message:"Workshop Completion Report has sent"})
        })
})


route.get('/eventcompletionloadlevel1/:deptId/:empId/:tableName',async(req,res)=>{
    const dId=req.params.deptId
    const eId=req.params.empId
    let sql="select report_lvl1_proposal from data_approval_ecr where dept_id=? and report_lvl1_proposal like ?"
    base.query(sql,[dId,'%'+eId+'%'],(err,row)=>{
        if(err){
            res.status(500).json({error:err.message})
            return
        }
        if(row.length==0){
            res.status(404).json({error:"No matches"})
            return
        }
        sql=`select * from ${req.params.tableName} where approval_status=3 and report_lvl1_proposal is not null and is_eve_completed=0 and dept_id=?`
        base.query(sql,[dId],(err,rows)=>{
            if(err){res.status(500).json({error:err.message});return;}
            if(row.length==0){res.status(404).json({error:"Nothing to show"})}
            res.status(200).json({rows})
        })
    })
})


route.put('/completionacknowledgelevel1/:deptId/:empId/:tableName',async(req,res)=>{
    const dId=req.params.deptId
    const eId=req.params.empId
    let sql=`select report_id from ${req.params.tableName} where dept_id=? and approval_status=3 and is_eve_completed=0`
    base.query(sql,[dId],(err,row)=>{
        if(err){
            res.status(500).json({error:err.message})
            console.log("selecting workshop")
            return
        }
        if(row.length==0){
            res.status(404).json({error:"No records available to acknowledge"})
            console.log("selecting workshop records")
            return
        }
        //no need
        sql="call GetNonNullColumnsForDeptId(?)"
        base.query(sql,[dId],(err,rows)=>{
            if(err){
                res.status(500).json({error:err.message})
                return
            }
            if(rows.length==0){
                res.status(404).json({error:"No records available to acknowledge"})
                return
            }
            console.log(rows[0])
            let count=rows.length
            // for (let index = 0; index < rows.length; index++)
            // {count++;}
            console.log(count)
            //upto this
            if(rows[0][0].column_value.includes(eId)){
                sql=`update ${req.params.tableName} set report_lvl1_proposal=?, approval_status=approval_status+1 where dept_id=? and is_eve_completed=0`
                base.query(sql,[eId,dId],(err,result)=>{
                    if(err){
                        res.status(500).json({error:err.message})
                        return
                    }
                    if(result.affectedRows==0){
                        res.status(404).json({error:"Event hasn't completed yet"})
                        return
                    }
                    res.status(200).json({message:"Completion report acknowledged by level"})
                })
            }
            else{
                res.status(404).json({error:"Forbidden access"})
            }
        })
    })
})

route.get('/completionloadlevel2/:deptId/:tableName',async(req,res)=>{
    const dId=req.params.deptId
    let sql=`select * from ${req.params.tableName} where approval_status=4 and is_eve_completed=0 and dept_id=?`
    base.query(sql,[dId],(err,row)=>{
        if(err){
            res.status(500).json({error:err.message})
            return
        }
        if(row.length==0){
            res.status(404).json({error:"No workshop to be approved"})
            return
        }
        res.status(200).json({row})
    })
})

route.put('/completionacknowledgelevel2/:deptId/:rid/:tableName',async(req,res)=>{
    const dId=req.params.deptId
    const rid=req.params.rid
    let sql=`update ${req.params.tableName} set report_lvl2_proposal=6000, approval_status=approval_status+1 where dept_id=? and report_id=?`
    base.query(sql,[dId,rid],(err,result)=>{
        if(err){
            res.status(500).json({error:err.message})
            return
        }
        if(result.affectedRows==0){
            res.status(404).json({error:"Nothing has approved"})
            return
        }
        //res.status(200).json({message:`${wid} approved by principal`})
        sql="call GetNonNullColumnsForDeptId(?)"
        base.query(sql,[dId],(err,rows)=>{
            if(err){
                res.status(500).json({error:err.message})
                return
            }
            if(rows.length==0){
                res.status(404).json({error:"No records available to acknowledge"})
                return
            }
            // console.log(rows[0])
            // let count=rows.length
            // console.log(count)
            sql=`update ${req.params.tableName} set is_eve_completed=is_eve_completed+1 where report_id=? and approval_status=5`
            base.query(sql,[rid],(err,result)=>{
                if(err){
                    res.status(500).json({error:err.message})
                    return
                }
                if(result.affectedRows==0){
                    res.status(404).json({error:"Event can't approved"})
                    return
                }
                res.status(200).json({message:`Event Report Completed ${dId}`})
            })
        })
    })
})

module.exports = route;
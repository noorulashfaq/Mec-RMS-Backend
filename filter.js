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

// route.get('/getCurrPrevAcdYrWithSubType/:subId',async(req,res)=>{
//     let sql=`
//     UPDATE data_sub_report_type
//     SET
//             current_year = (
//             SELECT acd_yr
//             FROM predefined_academic_year
//             WHERE predefined_academic_year.acd_status = 1
//         )
//     WHERE EXISTS (
//         SELECT 1
//         FROM predefined_academic_year
//         WHERE predefined_academic_year.acd_status like "%1%"
//     ) and sub_report_id = 3002 and acd_status="1"`
//     base.query(sql,[req.params.subId],(err,rows)=>{
//         if(err){
//             res.status(500).json({error:err.message})
//             return
//         }
//         else if(rows.length==0){
//             res.status(201).json({error:"No matches found"})
//             return
//         }
//         let sql=`select * from data_sub_report_type where sub_report_id = ? and acd_status like "%2%"`
//     base.query(sql,[req.params.subId],(err,results)=>{
//         if(err){
//             res.status(500).json({error:err.message})
//             return
//         }
//         else if(results.length==0){
//             res.status(201).json({error:"No matches found"})
//             return
//         }
//         // res.status(200).json({results})
//         let sql=`UPDATE data_sub_report_type
//         SET 
//             previous_year = (
//                 SELECT acd_yr
//                 FROM predefined_academic_year
//                 WHERE predefined_academic_year.acd_status = 2
//             ),
//                 current_year = (
//                 SELECT acd_yr
//                 FROM predefined_academic_year
//                 WHERE predefined_academic_year.acd_status = 1
//             )
        
//         WHERE EXISTS (
//             SELECT 1
//             FROM predefined_academic_year
//             WHERE predefined_academic_year.acd_status like "%1%" or "%2%"
//         ) and sub_report_id = ?;
//         `
//     base.query(sql,[req.params.subId],(err,rows)=>{
//         if(err){
//             res.status(500).json({error:err.message})
//             return
//         }
//         else if(rows.length==0){
//             res.status(201).json({error:"No matches found"})
//             return
//         }
//         let sql=`select * from data_sub_report_type where sub_report_id=?`
//     base.query(sql,[req.params.subId],(err,reply)=>{
//         if(err){
//             res.status(500).json({error:err.message})
//             return
//         }
//         else if(reply.length==0){
//             res.status(201).json({error:"No matches found"})
//             return
//         }
//         res.status(200).json({reply})
//     })
//     })
// })
//     })
// })

// route.get('/getAcdYrWithSubType/:subId',async(req,res)=>{
//     const acdYrResults = [];
//     let sql=`select acd_status from data_sub_report_type where sub_report_id=?`
//     base.query(sql,[req.params.subId],(err,rows)=>{
//         if(err){
//             res.status(500).json({error:err.message})
//             return
//         }
//         else if(rows.length==0){
//             res.status(201).json({error:"No matches found"})
//             return
//         }
//         // res.status(200).json({rows})
//         let definedYr=rows[0].acd_status.split(',')
//         console.log(definedYr)
//         for(let i=0;i<definedYr.length;i++){
//             let sql=`select acd_yr from predefined_academic_year where acd_status=?`
//             base.query(sql,[definedYr[i]],(err,results)=>{
//                 if(err){
//                     res.status(500).json({error:err.message})
//                     return
//                 }
//                 else if(results.length==0){
//                     res.status(201).json({error:"No matches found"})
//                     return
//                 }
//                 // res.status(200).json({results})
//                 acdYrResults.push(results[0])
//             })
//         }
//         console.log(acdYrResults)
//         res.status(200).json(acdYrResults)
//     })
// })

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


module.exports = route
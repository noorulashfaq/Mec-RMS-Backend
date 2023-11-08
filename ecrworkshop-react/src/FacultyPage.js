import { useEffect, useState } from "react"
import { GetAllRequests, approveLevel1, loadForLevel1 } from "./connect"
import './sty.css';

export const FacultyPage=()=>{

    const [fetchedReports,setFetchedReports]=useState([])

    // useEffect for fetching all the requests from overall tables for a particular faculty
    useEffect(()=>{
        const fetchAllRecords=async(dept_id,faculty_id)=>{
            try{
                const temp=await GetAllRequests(dept_id,faculty_id)
                const newReports=[]
                for(let i=0;i<(temp.data.receivedReports).length;i++){
                    for(let j=0;j<(temp.data.receivedReports[i]).length;j++){
                        // console.log(temp.data.receivedReports[i][j])
                        newReports.push(temp.data.receivedReports[i][j])
                    }
                }
                setFetchedReports(newReports)
            }
            catch(err){
                console.log(err)
            }
        }
        // console.log(fetchedReports)
        const logged=JSON.parse(sessionStorage.getItem("person"))
        fetchAllRecords(logged.dept_id,logged.faculty_id)
    },[])

    return(
        <>
            <body>

<div className="main">
    <div style={{marginTop:'100px'}}>
        <div className="box-container">

            <a className="topic-heading" href="/ecr">
                <div className="box box1"id="ecr">
                    <h2 className="topic-heading">ECR</h2>
                </div>
            </a>

            <a className="topic-heading" href="/setaf">
                <div className="box box4" id ="set">
                    <h2 className="topic-heading" id="tt">SeTAF</h2>
                </div>
            </a>

            <div className="box box3"id="ecr">
                    <h2 className="topic-heading" >IV</h2>
            </div>

            <div className="box box4" id ="set">
                <h2 className="topic-heading" id="tt">SeSTA</h2>
            </div>
        </div>
    </div>

    <div className="report-container1">
        <div className="report-header">
            <h1 className="recent-Articles">Requests</h1>
            <h6>Your request will visible here </h6>
        </div>

        <div>
            <table className='table table-striped '>

            <thead>
                <tr>
                    <th>Report id</th>
                    <th>Sub Type</th>
                    <th>Event Title</th>
                    <th>Co-ordinator</th>
                    <th>Actions</th>
                    <th>Status</th>
                </tr>
            </thead>

            <tbody>
            {
                fetchedReports.map((val,key)=>(
                    <tr key={val.report_id}>
                        <td>{val.report_id}</td>
                        <td>{val.event_name}</td>
                        <td>{val.event_title}</td>
                        <td>{val.event_coordinator}</td>
                        <td className="row justify-content-evenly">
                            <button type="button" onClick={async()=>{
                                // accept(val.dept_id,val.report_id);
                            }} className="btn btn-success col-4">Accept</button>
                            <button type="button" className="btn btn-dark col-4">Reject</button>
                        </td>
                        <td>{val.final_report_status}</td>
                    </tr>
                ))
            }
            </tbody>
            </table>
        </div>
    </div>
</div>
            </body>
        </>
)}
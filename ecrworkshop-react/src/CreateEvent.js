import {Table} from './connect';
import React, { useState, useEffect} from 'react';
import "./sty.css"
import SubButtons from './SubButtons';
import { useParams } from 'react-router-dom';

export const CreateEvent=()=>{

    const[allvalues,setAllvalues]=useState([]);

    const doSomething = async() =>{
        const logged=JSON.parse(sessionStorage.getItem("person"))
        const res=await Table(logged.dept_id)
        setAllvalues(res.data)
    }
    useEffect(() =>{
        doSomething();
    },[])

    const {id}=useParams()

    return(
        <>

<div className="main">
    <SubButtons/>
    <div className="report-container1">
        <div className="report-header">
            <h1 className="recent-Articles">Your Reports</h1>
                <a className="topic-heading" href={`/add/${id}`}><button className="view" id="addButton">+ Add</button></a>
        </div>

    <table className='table table-striped '>
        <thead>
            <tr>
                <th>ID</th>
                <th>Event Title</th>
                <th>Date</th>
                <th>Major Type</th>
                <th>Sub Type</th>
                <th></th>
                <th>Proposal</th>
                <th></th>
                <th></th>
                <th>Completion</th>
                <th></th>
                <th>Details</th>
            </tr>

            <tr>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th>Submitted on</th>
                <th>Hod</th>
                <th>Principal</th>
                <th>Submitted on</th>
                <th>Hod</th>
                <th>Principal</th>
                <th></th>
            </tr>
        </thead>

        <tbody>
        {
            allvalues.map((data)=>(
                <tr>
                    <td>{data.report_id}</td>
                    <td>{data.event_title}</td>
                    <td>{data.event_date.split('-').reverse().join('-')}</td>
                    <td>ECR</td>
                    <td>{(data.event_name)}</td>
                    <td>{data.event_date.split('-').reverse().join('-')}</td>
                    {
                        (data.report_proposal_status===0) ?
                        <>
                            <td>🕒Pending</td>
                            <td>🕒Pending</td>
                            <td></td>
                            {/* <td>{data.event_date.split('-').reverse().join('-')}</td> */}
                            <td>🕒Pending</td>
                            <td>🕒Pending</td>
                        </>
                        :
                        (data.report_proposal_status===1) ?
                        <>
                            <td><h3 style={{color:'green'}}>Accepted</h3></td>
                            <td>🕒Pending</td>
                            <td></td>
                            {/* <td>{data.event_date.split('-').reverse().join('-')}</td> */}
                            <td>🕒Pending</td>
                            <td>🕒Pending</td>
                        </>
                        :
                        (data.report_proposal_status===2) ?
                        <>
                            <td><h3 style={{color:'green'}}>Accepted</h3></td>
                            <td><h3 style={{color:'green'}}>Accepted</h3></td>
                            <td></td>
                            {/* <td>{data.event_date.split('-').reverse().join('-')}</td> */}
                            <td>🕒Pending</td>
                            <td>🕒Pending</td>
                        </>
                        :
                        (data.report_proposal_status===-1) ?
                        <>
                            <td><h3 style={{color:'red'}}>Rejected</h3></td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                        </>
                        :
                        <>
                        </>
                    }
                </tr>
            ))
        }
        </tbody>
    </table>
    </div>
</div>
        </>
)}
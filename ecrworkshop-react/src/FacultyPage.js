import { useEffect, useState } from "react"
import { GetAllRequests, approveLevel1, loadForLevel1 } from "./connect"
import './sty.css';
import MajorButtons from "./HeadButtons";
import { GetAllRequestsTable } from "./GetAllRequestsTable";

export const FacultyPage=()=>{

    return(
        <>
        <body>
            <div className="main">
                <MajorButtons/>
                <GetAllRequestsTable/>
            </div>
        </body>
        </>
)}
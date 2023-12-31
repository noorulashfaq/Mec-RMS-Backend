import { BrowserRouter, Route, Routes } from "react-router-dom"
import { FacultyMenu } from "./FacultyMenu"
import { CreateEvent } from "./CreateEvent"
import { useEffect, useState } from "react"
import { HodDashboard } from "./HodDashboard"
import { FacultyPage } from "./FacultyPage"
import { Add } from "./Add"
import { PrincipalDashboard } from "./PrincipalDashboard"

export const Dashboard=()=>{
    const[hodLog,setHodLog]=useState(false)
    const[principalLog,setPrincipalLog]=useState(false)

    useEffect(()=>{
        const logged=JSON.parse(sessionStorage.getItem("person"))
        if(logged.faculty_designation_id===404){
            setHodLog(true)
        }
    },[])

    useEffect(()=>{
        const logged=JSON.parse(sessionStorage.getItem("person"))
        if(logged.faculty_designation_id===402){
            setPrincipalLog(true)
        }
    },[])

    return(
        <>
        {
            (principalLog) ?
                <>
                    <PrincipalDashboard/>
                </>
            :
                (hodLog) ?
                    <>
                        <HodDashboard/>
                    </>
                :
                    <>
                        <BrowserRouter>
                            <FacultyMenu/>
                            <Routes>
                                <Route path="/" element={<FacultyPage/>} />
                                <Route path="/ecr/:id" element={<CreateEvent/>} />
                                <Route path="/add/:id" element={<Add/>} />
                                {/* <Route path="setaf" element={} /> */}
                            </Routes>
                        </BrowserRouter>
                    </>
        }
        </>
    )
}
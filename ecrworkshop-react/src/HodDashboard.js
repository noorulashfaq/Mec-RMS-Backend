import { BrowserRouter, Route, Routes } from "react-router-dom"
import { HodMenu } from "./HodMenu"
// import { ViewSeminar } from "./ViewSeminar"
import { FacultyPage } from "./FacultyPage"

export const HodDashboard=()=>{
    return(
        <>
            <BrowserRouter>
                <HodMenu/>
                {/* <ViewSeminar/> */}
                <FacultyPage/>
                <Routes>
                    {/* <Route path="ecr" element={<ViewSeminar/>} />
                    <Route path="setaf" element={<ViewSetAfs/>} />
                    <Route path="faculties" element={<FilterFaculties/>} />
                    <Route path="shortecr" element={<FilterEcrs/>} />
                    <Route path="shortsetaf" element={<FilterSetAfs/>} /> */}
                </Routes>
            </BrowserRouter>
        </>
    )
}
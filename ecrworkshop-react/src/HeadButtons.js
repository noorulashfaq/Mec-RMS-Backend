import { useEffect, useState } from "react"
import { getHeadId } from "./connect"
import "./sty.css"
// import { set } from "date-fns"

const MajorButtons=()=>{

    const[head,setHead]=useState([])
    const[hId, setHId]=useState("")

    useEffect(()=>{
        const getHeadButtons=async()=>{
            const temp= await getHeadId()
            setHead(temp)
        }
        getHeadButtons()
    },[])
// console.log(head)

    const onHeadClicked=()=>{
        console.log("hi")
    }

return(
    <div style={{marginTop:'100px'}}>
        {/* <div className="box-container">
        {
        head.map(item=>{
            return(
            <button style={{border:'none'}} key={item.head_report_id} value={item.head_report_id} className="topic-heading">
                <div onClick={(eve)=>{
                console.log(eve.target.name)
                }} name={item.head_report_id} className="box box1">
                    <h2 className="topic-heading">
                        {item.head_report}
                    </h2>
                </div>
            </button>
            )
        })
        }
        </div> */}
        <div className="box-container">

            <a name="ecr" value="1001" className="topic-heading" href="/ecr/1001">
                <div className="box box1"id="ecr">
                    <h2 className="topic-heading">ECR</h2>
                </div>
            </a>

            <a onClick={onHeadClicked} name="setaf" value="1002" className="topic-heading" href="/setaf">
                <div className="box box4" id ="set">
                    <h2 className="topic-heading" id="tt">SeTAF</h2>
                </div>
            </a>

            <a onClick={onHeadClicked} name="sesta" value="1003" className="topic-heading" href="/sesta">
                <div className="box box4" id ="set">
                    <h2 className="topic-heading" id="tt">SeSTA</h2>
                </div>
            </a>

            <a onClick={onHeadClicked} name="iv" value="1004" className="topic-heading" href="">
                <div className="box box4" id ="set">
                    <h2 className="topic-heading" id="tt">IV</h2>
                </div>
            </a>
        </div>
    </div>
)
}

export default MajorButtons
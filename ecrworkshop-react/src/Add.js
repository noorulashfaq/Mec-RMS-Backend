import { useEffect, useState } from "react"
import "./sty.css";
import { onProposalsLoad, onPropose,Venue,Major,SubReport,Academic} from "./connect"
import Form from 'react-bootstrap/Form';
import Select from 'react-select';
import axios from "axios";



export const Add=()=>{
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [option, setOptions] = useState([]);

    useEffect(() => {
        Ven();
        Maj();
        fillProposals()
        Acad();

    axios.get('http://localhost:1234/seminar/find')
        .then((response) => {
            setOptions(response.data.rows);
        })
        .catch((error) => {
            console.error('Error fetching options:', error);
        });
    }, []);


    const options = option.map((val, key) => ({
        value: val.faculty_id,
        label: val.faculty_id+'-'+val.faculty_name+'-'+val.dept,
      }));
    // console.log(facultySelect);
  
        const logged=JSON.parse(sessionStorage.getItem("person"))
      
    const[information,setInformation]=useState("")

    const[seminar,setSeminar]=useState({
        "major_id":null,
        "report_id":"",
        "event_name":"",
        "event_title":"",
        "event_organizer":"",
        "event_sponsor":"",
        "event_date":"",
        "event_venue":"",
        "guest_name":"",
        "guest_designation":"",
        "guest_address":"",
        "guest_phone_number":null,
        "guest_email":"",
        "student_count":null,
        "faculty_count":null,
        "others_count":null,
        "event_budget":null,
        "event_coordinator":"",
        "coordinator_emp_id":null,
        "coordinator_designation":null,
        "event_date_from":"0000-00-00",
        "event_date_to":"0000-00-00",
        "acdyr_id":null,
        "dept_id":null,
        "sem_id":null
    })

    const[proposable,setProposable]=useState([])
    const fillProposals=async()=>{
        const temp = await onProposalsLoad()
        setProposable(temp)
    }

    const[venue,setVenue]=useState([])
    const Ven=async()=>{
        const t = await Venue()
        setVenue(t)
    }

    const[year,setYear]=useState([])
        const Acad=async()=>{
            const t = await Academic()
            setYear(t)
        }

        // useState for major type dropdown in add event page
        const[major,setMajor]=useState([])
        const Maj=async()=>{
            const t = await Major()
            setMajor(t)
        }

        //useState for sub type dropdown in add event page
        const[sub,setSub]=useState([])
        const Sub=async(mid)=>{
            const t = await SubReport(mid)
            setSub(t)
        }

    const handleChange = (eve) => {
        setSelectedOptions(eve);

        if(eve.target){
            const{name,value}=eve.target
            setSeminar((old)=>{
                if(name==="event_coordinator"){
                    return{
                        ...old,
                        [name]:value
                    }
                }
            })
        }
        else{
            alert("Not working")
        }
    }
console.log(selectedOptions)

    const infoCollect=(eve)=>{
        const{name,value}=eve.target
        setSeminar((old)=>{
            if(name==="event_name"||name==="event_title"||name==="event_venue"||name==="event_organizer"||name==="event_sponsor"||name==="guest_name"||name==="guest_designation"||name==="guest_address"||name==="guest_email"||name==="proposal_date"||name==="acdyr_id"){
                return{
                    ...old,
                    [name]:value
                }
            }
            else if(name==="major_id"){
                Sub(value)
                return{
                    ...old,
                    [name]:parseInt(value)
                }
            }
            else if(name==="event_coordinator"){
                return{
                    ...old,
                    [name]:value
                }
            }
            else if(name==="event_date"){
                return{
                    ...old,
                    [name]:value
                }
            }
            else{
                return{
                    ...old,
                    [name]:parseInt(value)
                }
            }
        })
    }
    console.log(seminar)

    const callPropose=async()=>{
        const temp = await onPropose(seminar)
        if(temp.message===404||temp.message===500){
            alert("Error in entering data")
        }
        setInformation(temp.message)
    }

    return(
        <>
        <body>
<div className="main" >
<div className="report-container" style={{justifyContent:'center'}}>
<div className="report-header">
<h1 className="recent-Articles">EVENT PROPOSAL</h1>
</div>

<div className="row justify-content-center"style={{justifyContent:'center'}}>
<Form>

<div className="form group">

{/* --------------------------Top section------------------------------- */}
<label for="major_id">Major Type :</label>
<select name="major_id" value={seminar.major_id} onChange={infoCollect}>
<option value="">Select Major Type .......</option>
{
    major.map((val,key)=>{
        return (<option key={val.major_report_id} value={val.major_report_id}>{val.major_report}</option>)
    })
}
</select>

<label for="event_name">Sub Type :</label>
<select name="event_name" value={seminar.event_name} onChange={infoCollect}>
<option value="">Select Event Nature .......</option>
{
    sub.map((val,key)=>{
        return (<option key={val.sub_report_id} value={`data_management_${val.sub_report}`}>{val.sub_report}</option>)
    })
}
</select>
</div>

<div className="form group">
    <label for="event_title">Title of the Event :</label>
    <input onChange={infoCollect} value={seminar.event_title} type="text" name="event_title" placeholder="Event Title" className="form-control"/>
</div>

<div className="form group">
    <label for="event_organizer">Organised By:</label>
    <input onChange={infoCollect} value={seminar.event_organizer} type="text" name="event_organizer" placeholder="Event Organizer" className="form-control" />
</div>

<div className="form group">
    <label htmlFor="event_sponsor">Colloborating/Sponsored Agency 1:</label>
    <input type="text" name="event_sponsor" value={seminar.major_id} required onChange={infoCollect}placeholder="Event Sponsor" className="form-control" /><br />
</div>

<div className="form group">
    <label htmlFor="event_sponsor">Colloborating/Sponsored Agency 2:</label>
    <input type="text" name="event_sponsor1"  placeholder="Event Sponsor" className="form-control" /><br />
</div>

<div className="form group">
    <label htmlFor="event_date">Date of The Event Planned:</label>
    <input type="date" name="event_date" value={seminar.event_date} required onChange={infoCollect} /><br />
</div>

<div>
    <label htmlFor="event_venue">Venue:</label>
    <select name="event_venue" value={seminar.event_venue} onChange={infoCollect}>
    <option value="">Select Venue ......</option>
    {
        venue.map((val,key)=>{
            return (<option value={val.venue_name}>{val.venue_name}</option>)
        })
    }
    </select><br/>
</div>

{/* ---------------------------Guest details section--------------------------- */}
<div>
    <h1>Details of The Guest</h1>

    <label htmlFor="guest_name">Name:</label>
    <input type="text" placeholder="Name of the guest" name="guest_name" value={seminar.guest_name} required onChange={infoCollect} /><br />

    <label htmlFor="guest_designation">Designation:</label>
    <input type="text" placeholder="Designation of the guest" name="guest_designation" value={seminar.guest_designation} required onChange={infoCollect} /><br />

    <label htmlFor="guest_address">Address:</label>
    <input type="text" placeholder="Address of the guest" name="guest_address" value={seminar.guest_address} required onChange={infoCollect} /><br />

    <label htmlFor="guest_phone_number">Mobile Number:</label>
    <input type="number" placeholder="Phone number of the guest" name="guest_phone_number" value={seminar.guest_phone_number} required onChange={infoCollect} /><br />

    <label htmlFor="guest_email">Mail ID:</label>
    <input type="text" placeholder="Email of the guest" name="guest_email" value={seminar.guest_email} required onChange={infoCollect} /><br />
</div>

{/* ------------------------Participants section----------------------------- */}
<div>
    <h1>No of Participants (Expected)</h1>

    <label htmlFor="student_count">MEC Students:</label>
    <input type="number" placeholder="MEC students count" name="student_count" value={seminar.student_count} required onChange={infoCollect} /><br />

    <label htmlFor="faculty_count">MEC Faculty:</label>
    <input type="number" placeholder="MEC faculty count" name="faculty_count" value={seminar.faculty_count} required onChange={infoCollect} /><br />

    <label htmlFor="others_count">Others:</label>
    <input type="number" placeholder="Others count" name="others_count" value={seminar.others_count} required onChange={infoCollect} /><br />

    <label htmlFor="event_budget">Proposed Budget:</label>
    <input type="number" placeholder="Budget proposed for the event" name="event_budget" value={seminar.event_budget} required onChange={infoCollect} /><br />
</div>

{/* ----------------------Coordinator section--------------------------------- */}
<div>
    <h1>Co-ordinator of the Event</h1>

    <Select
    isMulti
    name="event_coordinator"
    options={options}
    value={selectedOptions}
    onChange={handleChange}
    isSearchable
    placeholder="Select options..."
    closeMenuOnSelect={false}
    />

    <label htmlFor="acdyr_id">Academic Year:</label>
    <select name="acdyr_id" className="form group" onChange={infoCollect} value={seminar.acad_yr_id}>
    <option value="">Select Academic Year</option>
    {
        year.map((val,key)=>{
            return (<option value={val.acd_yr_id}>{val.acd_yr}</option>)
        })
    }
    </select>

    <label htmlFor="sem">Semester :</label>
    <select name="sem" value={seminar.sem} onChange={infoCollect}>
    <option value="0">Odd Sem</option>
    <option value="1">Even Sem</option>
    </select><br/>
</div>

    </Form>

{/* -------------------------Button section---------------------------------- */}
<h1 style={{color:'red',}}>{information}</h1>

<div className='row mt-5 justify-content-around'>
    <input type='button' onClick={callPropose} value="Call Proposal" className='col-3 btn btn-primary' />
    <input type='button' onClick={()=>{
        setSeminar(()=>{
            return{
                "event_name":"",
                "event_title":"",
                "event_organizer":"",
                "event_sponsor":"",
                "event_date":"",
                "event_venue":"",
                "guest_name":"",
                "guest_designation":"",
                "guest_address":"",
                "guest_phone_number":null,
                "guest_email":"",
                "student_count":null,
                "faculty_count":null,
                "others_count":null,
                "proposal_date":"",
                "proposal_hod":"",
                "proposal_principal":"",
                "event_budget":null,
                "event_coordinator":"",
                "coordinator_designation":null,
                "acdyr_id":"",
                "dept_id":null,
                "sem_id":null
            }
        })
    }} value="Clear" className='col-3 btn btn-danger' />
</div>
</div>
</div>
</div>

</body>
</>
)}

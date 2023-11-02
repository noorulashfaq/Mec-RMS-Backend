// import { Container, Nav, Navbar } from "react-bootstrap";
import { useEffect, useState } from "react"
import "./sty.css";
import { callEventMajorsDropdown, onProposalsLoad, onPropose } from "./connect"
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export const Add=()=>{

    const [eventMajor, setEventMajor] = useState({});

    const[information,setInformation]=useState("")

    const[seminar,setSeminar]=useState({
        
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
        "guest_phone_number":0,
        "guest_email":"",
        "student_count":0,
        "faculty_count":0,
        "others_count":0,
        "event_budget":0,
        "event_coordinator":"",
        "coordinator_emp_id":0,
        "coordinator_phone_number":0,
        "coordinator_designation":0,
        "event_date_from":"0000-00-00",
        "event_date_to":"0000-00-00",
        "acdyr_id":0,
        "dept_id":0,
        "sem_id":0
        
    })
    // console.log(seminar);
    console.log(eventMajor)

    const[proposable,setProposable]=useState([])

    const fillPorposals=async(dept_id)=>{
        const temp = await onProposalsLoad(dept_id)
        setProposable(temp)
    }

    const infoCollect=(eve)=>{
        const{name,value}=eve.target
        setSeminar((old)=>{
            if(name==="event_name"||name==="event_title"||name==="event_organizer"||name==="event_sponsor"||name==="event_date"||name==="event_venue"||name==="guest_name"||name==="guest_designation"||name==="guest_address"||name==="guest_email"||name==="proposal_date"||name==="event_coordinator"||name==="acdyr_id"){
                return{
                    ...old,
                    [name]:value
                }
            }
            else if(name==="dept_id"){
                fillPorposals(value)
                return{
                    ...old,
                    [name]:parseInt(value)
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

    const callPropose=async()=>{
        const temp = await onPropose(seminar)
        setInformation(temp.message)
    }

    useEffect(()=>{
        const eventMajorsDropdown=async()=>{
            const temp = await callEventMajorsDropdown()
            alert(JSON.stringify(temp.data.rows))
            setEventMajor(temp.data.rows)
        }
        eventMajorsDropdown()
    },[])

    return(
        <>
        <body>
        <div class="main" >



 <div className="report-container" style={{justifyContent:'center'}}>
     <div class="report-header">
         <h1 class="recent-Articles">EVENT PROPOSAL</h1>
        
     </div>
     <div className="row justify-content-center"style={{justifyContent:'center'}}>

     {/* <label htmlFor="event-type">Select Event Type:</label>
      <select id="event-type" onChange={handleChange} value={eventType}>
        <option value="seminar">Seminar</option>
        <option value="workshop">Workshop</option>
      </select> */}
       <Form>
     

     <div className="form group">
     <Form.Select aria-label="Nature of the event" name="event_name" value={seminar.event_name} onChange={infoCollect} style={{ width: '80%' }}>
  {/* <option value="">Select Event Nature .......</option>
  <option value="data_management_workshop">Workshop</option>
  <option value="data_management_Seminar">Seminar</option>
  <option value="Conference">Conference</option>
  <option value="Technical Symposium">Technical Symposium</option>
  <option value="Guest Lecture">Guest Lecture</option>
  <option value="FDP">FDP</option> */}
  {eventMajor.map((item)=>{
      <option key={item.major_report_id} value={item.major_report_id}>{item.major_report}</option>
  })}

</Form.Select>

     {/* <label >Nature of the event :</label>

                        <select name="event_name" className="form-select" value={seminar.event_name} onChange={infoCollect}  style={{width:'80%'}}>
                        <option value="">Select Event Nature .......</option>
                        <option value="data_ecr_workshop">Workshop</option>
                        <option value="Seminar">Seminar</option>
                        <option value="Conference">Conference</option>
                        <option value="Technical Symposium">Technical Symposium</option>
                        <option value="Guest Lecture">Guest Lecture</option>
                        <option value="FDP">FDP</option>
                        </select> */}
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
      <label htmlFor="event_sponsor">Colloborating/Sponsored Agency:</label>
      <input type="text" name="event_sponsor" value={seminar.event_sponsor} required onChange={infoCollect}placeholder="Event Sponsor" className="form-control" /><br />
      </div>
      <div className="form group">
      <label htmlFor="event_date">Date of The Event Planned:</label>
      <input type="date" name="event_date" value={seminar.event_date} required onChange={infoCollect} /><br />

      <label htmlFor="event_venue">Venue:</label>
      <select name="event_venue" value={seminar.event_venue} onChange={infoCollect}>
        
      <option value="">Select Venue ......</option>
        <option value="Seminar Hall I">Seminar Hall I</option>
        <option value="Seminar Hall II">Seminar Hall II</option>
        <option value="Cloud Computing Lab">Cloud Computing Lab</option>
        <option value="Data Analytics Lab">Data Analytics Lab</option>
      </select><br />

      <h1>Details of The Guest</h1>
      <label htmlFor="guest_name">Name:</label>
      <input type="text" name="guest_name" value={seminar.guest_name} required onChange={infoCollect} /><br />

      <label htmlFor="guest_designation">Designation:</label>
      <input type="text" name="guest_designation" value={seminar.guest_designation} required onChange={infoCollect} /><br />

      <label htmlFor="guest_address">Address:</label>
      <input type="text" name="guest_address" value={seminar.guest_address} required onChange={infoCollect} /><br />

      <label htmlFor="guest_phone_number">Mobile Number:</label>
      <input type="number" name="guest_phone_number" value={seminar.guest_phone_number} required onChange={infoCollect} /><br />

      <label htmlFor="guest_email">Mail ids</label>
      <input type="text" name="guest_email" value={seminar.guest_email} required onChange={infoCollect} /><br />

      <h1>No of Participants (Expected)</h1>
      <label htmlFor="student_count">MEC Students:</label>
      <input type="number" name="student_count" value={seminar.student_count} required onChange={infoCollect} /><br />

      <label htmlFor="faculty_count">MEC Faculty:</label>
      <input type="number" name="faculty_count" value={seminar.faculty_count} required onChange={infoCollect} /><br />

      <label htmlFor="others_count">Others:</label>
      <input type="number" name="others_count" value={seminar.others_count} required onChange={infoCollect} /><br />

      <label htmlFor="event_budget">Proposed Budget:</label>
      <input type="number" name="event_budget" value={seminar.event_budget} required onChange={infoCollect} /><br />

      <h1>Co-ordinator of the Event</h1>

      <label htmlFor="dept_id">Department:</label>
      <select name="dept_id" value={seminar.dept_id} onChange={infoCollect}>
      <option value="">Select Department ......</option>
        <option value="1">CSE</option>
        <option value="2">ECE</option>
        <option value="3">EEE</option>
        <option value="4">IT</option>
        <option value="5">CY</option>
        <option value="6">AIDS</option>
      </select><br />

      <label>Event Coordinator</label>
                        <select name="event_coordinator" className="form group" onChange={infoCollect} value={seminar.event_coordinator}>
                        <option value="">Select Faculty</option>
                            {
                                proposable.map((val,key)=>{
                                    return (<option value={val.faculty_id}>{val.faculty_name}</option>)
                                })
                            }
                        </select>
      <label htmlFor="acdyr_id">Academic Year:</label>
      <input type="text" name="acdyr_id" value={seminar.acdyr_id} required onChange={infoCollect} /><br />

      <label htmlFor="sem">Semester :</label>
      <select name="sem" value={seminar.sem} onChange={infoCollect}>
        <option value="0">Odd Sem</option>
        <option value="1">Even Sem</option>
      </select><br />
      
   
     

      
    </div>
    </Form>

    <h1>{information}</h1>
         
    <div className='row mt-5 justify-content-around'>
        <input type='button' onClick={callPropose} value="Propose" className='col-3 btn btn-primary' />
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
        "guest_phone_number":0,
        "guest_email":"",
        "student_count":0,
        "faculty_count":0,
        "others_count":0,
        "proposal_date":"",
        "proposal_hod":"",
        "proposal_principal":"",
        "event_budget":0,
        "event_coordinator":"",
        
        "":0,
        "coordinator_designation":406,
        "acdyr_id":"",
        "dept_id":0,
        "sem_id":0
        
                                }
                            })
                        }} value="Clear" className='col-3 btn btn-danger' />
                    </div>   
        
         
         {/* <label for="coll">Colloborating`/Sponsored Agency:</label>
         <input type="text" name="coll" required/><br/>
         <label for="date">Date of The Event Planned:</label>
         <input type="date" name="date" required/><br/>
         <label for="venue">Venue : </label>
<select name="venue">
<option value="Seminar Hall I">Seminar Hall I</option>
<option value="Seminar Hall II">Seminar Hall II</option>
<option value="Cloud Computing Lab">Cloud Computing Lab</option>
<option value="Data Analytics Lab">Data Analytics Lab</option>

</select><br/>
         <h1>Details of The Guest</h1>
         <label for="Name">Name:</label>
         <input type="text" name="Name" required/><br/>
         <label for="designation">Designation:</label>
         <input type="text" name="designation" required/><br/>
         <label for="address">Address:</label>
         <input type="text" name="address" required/><br/>
         <label for="number">Mobile Number:</label>
         <input type="number" name="number" required/><br/>
         <label for="mail">Mail ids</label>
         <input type="text" name="mail" required/><br/>
         <h1>No of Participants (Expected)</h1>
         <label for="mecs">MEC Students:</label>
         <input type="number" name="mecs" required/><br/>
         <label for="mecf">MEC Faculty:</label>
         <input type="text" name="mecf" required/><br/>
         <label for="others">Others:</label>
         <input type="text" name="others" required/><br/>
         <label for="others">Proposed Budget:</label>
         <input type="text" name="budget" required/><br/>
         <h1>Co-ordinator of the Event</h1>
         <label for="Name">Name:</label>
         <input type="text" name="CName" required><br>
         <label for="designation">Academic Year:</label>
         <input type="text" name="year" required><br>
         <label for="sem">Semester :</label>
<select name="sem">
<option value="ODD ">Odd Sem</option>
<option value="EVEN">even Sem</option>
</select><br>
         <label for="department">Department:</label>
<select name="dept">
<option value="CSE">CSE</option>
<option value="ECE">ECE</option>
<option value="EEE">EEE</option>
<option value="IT">IT</option>
<option value="CY">CY</option>
<option value="AIDS">AIDS</option>
</select><br/>

        

         <input type="submit" value="Submit"/> */}
         
    
      
 </div>
 </div>
 
 </div>
        
 </body>
        </>
    )
}
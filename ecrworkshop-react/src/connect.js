import axios from 'axios'

const url="http://localhost:1234"

// axios for login page
export const onLogin=async(obj)=>{
    const returned = await axios.post(`${url}/filter/loginCredentials`,obj)
    return returned.data
}

// axios for proposing an event in add event page
export const onPropose=async(obj)=>{
    const returned = await axios.post(`${url}/ecr/ecrProposal/${obj.event_name}`,obj)
    return returned.data
}

export const onProposalsLoad=async()=>{
    // alert(dept_id)
    const returned=await axios.get(`${url}/seminar/find`)
    let ids=[]
    returned.data.rows.map((v)=>{
        ids.push(v)
    })
    return ids
}

export const loadForLevel1=async(dept,emp)=>{
    // alert(dept)
    // const receive = await axios.get(`${url}/seminar/loadForLevel1/data_management_seminar/${dept}/${emp}`)
    const receive = await axios.get(`http://localhost:4321/ecr/loadforlevel1/data_management_seminar/${dept}/${emp}`)
    return receive.data.rows

}

export const approveLevel1=async(dept,emp,report_id)=>{
    const receive = await axios.put(`${url}/seminar/acknowledgelevel1/data_management_seminar/${dept}/${emp}/${report_id}`)
    return receive.data
}
export const Table=async(obj)=>
{
     // alert("axios called")
    // const url="";
    const temp=await axios.get(`${url}/dept/${obj}`);
    // console.log(temp.data)
    return temp;
}

export const callLoadForLevel2=async(empid)=>{
    // alert(empid)
    const deptid = 1;
//     const receive = await axios.get(`${url}/seminar/loadforlevel2/data_management_seminar/${deptid}/${empid}`);
  
//     return receive.data
    
// }

try {
    const response = await axios.get(`${url}/seminar/loadforlevel2/data_management_seminar/${deptid}/${empid}`);
    return response.data;
    } catch (error) {
    console.log("No request found")
    }
}


export const callAcceptLevel2=async(dept,empid,report_id)=>{
    try{
    const response=await axios.put(`${url}/seminar/acknowledgelevel2/data_management_seminar/${dept}/${empid}/${report_id}`)
    return response.data
    }
    catch (error){
        alert("Accept Error")
    }
}

export const GetAllRequests=async(dept_id,faculty_id)=>{
    const re=await axios.get(`http://localhost:1234/filter/getAllReportsAcrossTables/${dept_id}/${faculty_id}`)
    return re
}

// axios for venue dropdown of add event page
export const Venue=async()=>{
    const res=await axios.get(`${url}/dropdown/dropdownVenue`)
    let ids=[]
    res.data.rows.map((v)=>{
        ids.push(v)
    })
    return ids
}

export const getHeadId=async()=>{
    const returned = await axios.get(`${url}/filter/getHeadType`)
    return returned.data.rows
}

// axios for major type dropdown of add event page
export const Major=async(id)=>{
    const re=await axios.get(`${url}/dropdown/dropdownMajorTypeWithHead/${id}`)
    let ids=[]
    re.data.rows.map((v)=>{
        ids.push(v)
    })
    return ids
}

// axios for sub type dropdown of add event page
export const SubReport=async(mid)=>{
    const re=await axios.get(`${url}/dropdown/dropdownSubTypeWithMajor/${mid}`)
    let ids=[]
    re.data.rows.map((v)=>{
        ids.push(v)
    })
    return ids
}

// axios for faculty coordinator dropdown of add event page
export const FacultyList=async()=>{
    const re = await axios.get('http://localhost:1234/filter/filteringAPandASP')
    let ids=[]
    re.data.rows.map(v=>{
        ids.push(v)
    })
    return ids
}

export const Academic=async()=>{
    const re=await axios.get(`${url}/seminar/currentAcademicYear`)
    let ids=[]
    re.data.rows.map((v)=>{
        ids.push(v)
    })
    return ids
}
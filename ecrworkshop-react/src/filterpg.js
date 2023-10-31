import { useEffect, useState } from 'react';
import axios from 'axios'



function FormFileExample() {
  const [read,setRead]=useState([])

  useEffect(()=>{
      const fetchAllRecords = async()=>{
          try{
              const res = await axios.get("http://localhost:4321/filter/filterDept")
              setRead(res.data.rows)
          }catch(err){
              console.log(err)
          }
      }
      fetchAllRecords()
  },[])




  return (
    <>



    <label>Choose a dept:</label>
    <select name="department" id="depart">
    {read.map(item=>{
      return(
      <option name={item.dept_id} key={item.dept_id}>{item.dept}</option>
      )
    })}
    </select>

    






    </>
  );
}

export default FormFileExample;
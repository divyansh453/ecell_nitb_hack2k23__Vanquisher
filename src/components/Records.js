import React ,{useState}from 'react';
import "../styles/Records.css";
import { placement_record } from './Home';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import RecordsData from './RecordsData';
import Navbar from './Navbar';
import axios from 'axios';


const Records = () => {

  const initialvalues={
    company:'',
    skills:'',
    employment_type:'',
    category:'',
  }
 
  const [formvalues,setformvalues]=useState(initialvalues);
  const [updatedData,setupdatedData]=useState(placement_record);

  const userHandler=(e)=>{
    const {name,value}=e.target;
    setformvalues({...formvalues,[name]:value})
  }

  const submitHandler=(e)=>{
    console.log(formvalues)
    e.preventDefault();
     axios.get(`https://ecellnitbhack2k23vanquisher-production.up.railway.app/info_student/admin_view_company/${formvalues.company}`)
     .then((res)=>{
      setupdatedData(res.data)
      console.log(res)
     }).catch((err)=>{
      console.log(err)
     })

     axios.get(`https://ecellnitbhack2k23vanquisher-production.up.railway.app/info_student/admin_view_skill/${formvalues.skills}`)
     .then((res)=>{
      setupdatedData(res.data)
      console.log(res)
     }).catch((err)=>{
      console.log(err);
     })

     axios.get(`https://ecellnitbhack2k23vanquisher-production.up.railway.app/info_student/admin_view_placement/${formvalues.employment_type}`)
     .then((res)=>{
      setupdatedData(res.data)
      console.log(res)
     }).catch((err)=>{
      console.log(err);
     })

     axios.get(`https://ecellnitbhack2k23vanquisher-production.up.railway.app/info_student/admin_view_employment/${formvalues.category}`)
     .then((res)=>{
      setupdatedData(res.data)
      console.log(res)
     }).catch((err)=>{
      console.log(err);
     })
  }
//   const filterRide=(e)=>{
//     const{name,value}=e.target;
//     setformvalues({...formvalues,[name]:value});
//  }

  return (
    <div className='records'>
      <h2>Placement Records</h2>
      <div className='records_display'>
        <div className='student_record'>
          {updatedData.map((val)=>{
            return(
              <div className='record_entry'>
                <RecordsData status={val.employment_type} type={val.placement} name={val.full_name} company={val.company} package={val.package}/>
              </div>
            )
          })}
        </div>
        <div className='filters'>
        <form className='record-filter'>
          <div className="employment_type_filter">
            <h4>Filter By CAMPUS</h4>
            <input type="radio" name="employment_type" value="All" onClick={userHandler}/>
            <label>All</label><br/> 
            <input type="radio" name="employment_type" value="oncampus" onClick={userHandler}/>
            <label>OnCampus</label><br/>
            <input type="radio" name="employment_type" value="offcampus" onClick={userHandler}/>
            <label>OffCampus</label><br/>
          </div>

          <div className="employment_type_filter">
            <h4>Filter By CATEGORY</h4>
            <input type="radio" name="category" value="All"  onClick={userHandler}/>
            <label>All</label><br/> 
            <input type="radio" name="category" value="Internship" onClick={userHandler}/>
            <label>Internship</label><br/>
            <input type="radio" name="category" value="Placement"  onClick={userHandler}/>
            <label>Placement</label><br/>
          </div>

          <div>
            <h4>Filter By Comapany</h4>
            <input type="text" value={formvalues.company} onChange={userHandler} name="company" placeholder='Company Name'/>
          </div>

          <div>
            <h4>Filter By Skills</h4>
            <input type="text" value={formvalues.skills} onChange={userHandler} name="skills" placeholder='Skills'/>
          </div>


          <Stack spacing={2} direction="row" className="records_submit">
              <Button variant="contained" onClick={submitHandler}>Apply Filter</Button>
           </Stack>
         
        </form>
        </div>
      </div>
    </div>
  )
}

export default Records
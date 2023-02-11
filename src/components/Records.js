import React ,{useState}from 'react';
import "../styles/Records.css";
import { placement_record } from './Home';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import RecordsData from './RecordsData';
import axios from 'axios';


const Records = () => {

  const initialvalues={
    company:'',
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
          <div class="employment_type_filter">
            <h4>Filter By CAMPUS</h4>
            <input type="radio" name="employment_type" value="All" />
            <label>All</label><br/> 
            <input type="radio" name="employment_type" value="Oncampus"/>
            <label>OnCampus</label><br/>
            <input type="radio" name="employment_type" value="Offcampus" />
            <label>OffCampus</label><br/>
          </div>

          <div>
            <h4>Filter By Comapany</h4>
            <input type="text" value={formvalues.company} onChange={userHandler} name="company" placeholder='Company Name'/>
          </div>



          {/* <div className='priceFilter'>
            <h4>Filter by </h4>
             <input type="radio" value="100" name=""/>
             <label>Below 100</label><br/>
             <input type="radio" value="500" name="price"/>
             <label>Below 500</label><br/>
             <input type="radio" value="1000" name="price"/>
             <label>Below 1000</label><br/>
             <input type="radio" value="5000" name="price"/>
             <label>Below 5000</label><br/>
          </div> */}

          <Stack spacing={2} direction="row">
              <Button variant="contained" onClick={submitHandler}>Apply Filter</Button>
           </Stack>
         
        </form>
        </div>
      </div>
    </div>
  )
}

export default Records
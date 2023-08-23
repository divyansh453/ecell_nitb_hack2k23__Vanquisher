import React ,{useState}from 'react';
import "../styles/AdminHome.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Navbar from './Navbar';
import block1 from "../images/block1.svg";
import block2 from "../images/block2.svg";
import AdminNav from './AdminNav';

export let placement_record=[];

const AdminHome = () => {
    const initialvalues={
        course:"",
        branch:"",
    } 
    const [formvalues,setformvalues]=useState(initialvalues);
    const navigate=useNavigate();
    const userHandler=(e)=>{
      const {name,value}=e.target;
      setformvalues({...formvalues,[name]:value});
    }

    const submitHandler=(e)=>{
        e.preventDefault();
        axios.get(`https://ecellnitbhack2k23vanquisher-production.up.railway.app/info_student/admin_view/${formvalues.course}/${formvalues.branch}`)
        .then((res)=>{
          // console.log(res.data);
          placement_record=res.data;
          console.log(placement_record);
          navigate("/records");
        }).catch((err)=>{
          console.log(err);
        })
        
    }
  return (
    <div className='home'>
      <AdminNav/>
      <div className='home_section'>
      <h1>Get Detailed Records And Statistics Of Previous Year Placed Students</h1>
      <h2 style={{color:"grey"}}>Easily Refer to Large Number Of Companies</h2>
        <form>
            <div className='home_btn'>
              <div className='select_record'>
                <select name="course" onChange={userHandler} className="records_selector">
                    <option value="" disabled selected>Course</option>
                  <option value="B.Tech">BTech</option>
                  <option value="M.Tech">MTech</option>
                </select>

                <select name="branch"  onChange={userHandler} className="records_selector">
                    <option value="" disabled selected>Branch</option>
                  <option value="CSE">CSE</option>
                  <option value="IT">IT</option>
                </select>
                </div>

                <Stack spacing={3} direction="row">
                  <Button variant="contained"  fullWidth  id='submit' onClick={submitHandler}>Go To Records</Button>
               </Stack>
            </div>
        </form>
        </div>
        <img src={block1} className="block1"/>
        <img src={block2} className="block2"/>
    </div>
  )
}

export default AdminHome
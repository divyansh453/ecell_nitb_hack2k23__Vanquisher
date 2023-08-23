import { compose } from '@mui/system';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Navigate, NavLink, useNavigate } from 'react-router-dom';
import "../styles/Seek.css";
import Navbar from './Navbar';


const Login = () => {
    const initialvalues={
        full_name:"",
        mobile_number:"",
        email:"",
        employment_type:"",
        job_title:"",
        address:"",
        linkedin:""
    }
    const navigate=useNavigate();
    const [formvalues,setformvalues]=useState(initialvalues);
    

    const userHandler=(e)=>{
        const {name,value}=e.target;
        setformvalues({...formvalues,[name]:value});
    }
    

    const submitHandler=(e)=>{
        e.preventDefault();
        axios.post("https://ecellnitbhack2k23vanquisher-production.up.railway.app/info_student/job_form/5",{
            full_name:formvalues.full_name,
            mobile_number:formvalues.mobile_number,
            email:formvalues.email,
            employment_type:formvalues.employment_type,
            job_title:formvalues.job_title,
            address:formvalues.address,
            linkedin:formvalues.linkedin,
            user:5,
        }).then((res)=>{
            console.log(res);
        }).catch((err)=>{
            console.log(err);
    })
    }

    return(
        <>
        <Navbar/>
       <div className='login'>
       
        
       <h2 id="h2">Send Mails Directly to Corporation/Companies</h2>
        <div class="loginControls">
        
            <form onSubmit={submitHandler} className="loginPage">
                {/* <label className='label_login'>Full Name</label> */}
                <input type="text" name="full_name" value={formvalues.full_name} placeholder="Full Name" onChange={userHandler}/>
                 
                {/* <label  className='label_login'>Mobile Number</label> */}
                <input type="number" name="mobile_number" value={formvalues.mobile_number} placeholder="Mobile Number" onChange={userHandler}/>

                {/* <label  className='label_login'>Email Address</label> */}
                <input type="email" name="email" value={formvalues.email} placeholder="Email Adcdress" onChange={userHandler}/>
                
                {/* <label className='label_login'>Job Title</label> */}
                <input type="text" name="job_title" value={formvalues.job_title} placeholder="Job Title" onChange={userHandler}/>
                
                {/* <label className='label_login'>Employment_type</label> */}
                <select value={formvalues.employment_type} name="employment_type" onChange={userHandler} className='select_employee'>
                    <option value="" selected disabled>Please Select</option>
                    <option value="Internship">Internship</option>
                    <option value="Placement">Placement</option>
                </select>


                {/* <label className='label_login'>Address</label> */}
                <input type="text" name="address" value={formvalues.address} placeholder="Address" onChange={userHandler}/>

                {/* <label className='label_login'>LinkeIn Profile</label> */}
                <input type="text" name="linkedin" value={formvalues.linkedin} placeholder="LinkeIn Profile" onChange={userHandler}/>

                <input type="submit" value="Send" className='logInsubmit'/>
            </form>
            {/* <NavLink to="/forgetPassword" className="forgetPassword">Forgotten Password?</NavLink>
            <h4>Not Have An Account?</h4>
            
            <button  className="register">Register</button> */}
            
        </div>
        {/* <div className={iscredentials?"successfulLogin":"hide"}>
       <p>Invalid Mobile Number or Password</p>
    </div> */}
    </div>
    </>
  )
}

export default Login
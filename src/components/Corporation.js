import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Navigate, NavLink, useNavigate } from 'react-router-dom';
import "../styles/Corporation.css";
import Navbar from './Navbar';


// export let profile_data={
//   company_name: "",
//   employment_type: "",
//   job_title: "",
//   description: "",
//   email: "",
//   cgpa: "",
//   user: 2,
// }

const Login = () => {
    const initialvalues={
      company_name: "",
      employment_type: "",
      job_title: "",
      description: "",
      email: "",
      cgpa: "",
      user: 2
    }
    // const navigate=useNavigate();
    const [formvalues,setformvalues]=useState(initialvalues);
    const [submitcall,setSubmitcall]=useState(false);


    const userHandler=(e)=>{
        const {name,value}=e.target;
        setformvalues({...formvalues,[name]:value});
    }
    

    const submitHandler=(e)=>{
        e.preventDefault();
        axios.post("https://ecellnitbhack2k23vanquisher-production.up.railway.app/info_student/company_form/2",{
          company_name: formvalues.company_name,
          employment_type: formvalues.employment_type,
          job_title: formvalues.job_title,
          description: formvalues.description,
          email: formvalues.email,
          cgpa: formvalues.cgpa,
          user: 2
        }).then((res)=>{
            console.log(res)
            // profile_data.id=res.data.profile_data.id;
            // console.log(profile_data);
            // localStorage.setItem("login","active");
            // localStorage.setItem("profile_id",profile_data.id);
            // localStorage.setItem("profile_name",profile_data.name);
            // setLoading(false);
            // navigate("/home");
        }).catch((err)=>{
            console.log(err);
            // setLoading(false);
            // setIscredentials(true);
            // setTimeout(()=>{
            //     s
            // },3000)
        })
    }

    // useEffect(()=>{
        
    //         axios.post("https://ecellnitbhack2k23vanquisher-production.up.railway.app/info_student/company_form/2",{
    //           company_name: formvalues.company_name,
    //           employment_type: formvalues.employment_type,
    //           job_title: formvalues.job_title,
    //           description: formvalues.description,
    //           email: formvalues.email,
    //           cgpa: formvalues.cgpa,
    //           user: 2
    //         }).then((res)=>{
    //             console.log(res)
    //             // profile_data.id=res.data.profile_data.id;
    //             // console.log(profile_data);
    //             // localStorage.setItem("login","active");
    //             // localStorage.setItem("profile_id",profile_data.id);
    //             // localStorage.setItem("profile_name",profile_data.name);
    //             // setLoading(false);
    //             // navigate("/home");
    //         }).catch((err)=>{
    //             console.log(err);
    //             // setLoading(false);
    //             // setIscredentials(true);
    //             // setTimeout(()=>{
    //             //     s
    //             // },3000)
    //         })
    //         // console.log(formvalues);
        
    // },[submitcall])


    return(
        <>
        {/* <Navbar/> */}
       
    <div className='login'>
    <h1>Send Emails in One Click!</h1>
        
        <div class="loginControls">
          
        {/* <h1>CarGo.</h1> */}
            <form onSubmit={submitHandler} className="loginPage">
                <input type="text" name="company_name" value={formvalues.company_name} placeholder="Company Name" onChange={userHandler}/>
                <input type="text" name="email" value={formvalues.email} placeholder="Email Address" onChange={userHandler}/>
                <input type="text" name="employment_type" value={formvalues.employment_type} placeholder="Employment Type" onChange={userHandler}/>
                <input type="text" name="job_title" value={formvalues.job_title} placeholder="Job Title" onChange={userHandler}/>
                <input type="text" name="description" value={formvalues.description} placeholder="Description" onChange={userHandler}/>
                <input type="text" name="cgpa" value={formvalues.cgpa} placeholder="CGPA" onChange={userHandler}/>

                <input type="submit" value="LogIn" className='logInsubmit'/>
            </form>
            {/* <NavLink to="/forgetPassword" className="forgetPassword">Forgotten Password?</NavLink> */}
            {/* <h4>Not Have An Account?</h4> */}
            
            {/* <button  className="register">Register</button> */}
            
        </div>
        {/* <div className={iscredentials?"successfulLogin":"hide"}>
       <p>Invalid Mobile Number or Password</p>
    </div> */}
    </div>
    </>
  )
}

export default Login;
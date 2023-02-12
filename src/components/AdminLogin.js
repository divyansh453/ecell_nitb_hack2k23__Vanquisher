import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Navigate, NavLink, useNavigate } from 'react-router-dom';
import "../styles/AdminLogin.css";
// import HashLoader from "react-spinners/HashLoader";

export let profile_data={
    id:"",
    name:"",
    email:"",
    mobile_no:"",
    age:"",
}

const AdminLogin = () => {
    const initialvalues={
        roll_number:"",
        password:""
    }
    const navigate=useNavigate();
    const [formvalues,setformvalues]=useState(initialvalues);
    const [formerror,setformerror]=useState({});
    const [noerror,setnoerror]=useState(false);
    const[iscredentials,setIscredentials]=useState(false);
    const [submitcall,setSubmitcall]=useState(false);
    // const [loading,setLoading]=useState(false);

    const userHandler=(e)=>{
        const {name,value}=e.target;
        setformvalues({...formvalues,[name]:value});
    }
    const error=()=>{
        const errors={}
        setnoerror(true);
        if(formvalues.password==""){
            errors.password="**This field is required"
            setnoerror(false)
        }
        else{
            errors.password="";
        }

        return errors;
    }

    const submitHandler=(e)=>{
        e.preventDefault();
        setformerror(error());
        if(submitcall==false){
        setSubmitcall(true);
        }
        else{
            setSubmitcall(false);
        }
    }

    useEffect(()=>{
        if(noerror==true){
            // setLoading(true);
            axios.post("https://ecellnitbhack2k23vanquisher-production.up.railway.app/accounts/login/",{
                roll_number:formvalues.roll_number,
                password:formvalues.password
            }).then((res)=>{
                console.log(res);
                profile_data.id=res.data.profile_data.id;
                profile_data.name=res.data.profile_data.full_name;
                profile_data.age=res.data.profile_data.age;
                profile_data.mobile_no=res.data.profile_data.mobile_number;
                profile_data.email=res.data.profile_data.email;
                console.log(profile_data);
                localStorage.setItem("login","active");
                localStorage.setItem("profile_id",profile_data.id);
                localStorage.setItem("profile_name",profile_data.name);
                localStorage.setItem("profile_roll",res.data.profile_data.roll_number);
                localStorage.setItem("profile_cgpa",res.data.profile_data.cgpa);
                localStorage.setItem("profile_course",res.data.profile_data.course);
                // setLoading(false);
                navigate("/admin-home");
            }).catch((err)=>{
                console.log(err);
                // setLoading(false);
                setIscredentials(true);
                setTimeout(()=>{
                    setIscredentials(false);
                },3000)
            })
            // console.log(formvalues);
        }
    },[submitcall])

    const userRegister=()=>{
        navigate("/register");
        localStorage.setItem("register","active");
    }

    return(
        <>
    <div className='login'>
        
        <div class="loginControls">
        
            <form onSubmit={submitHandler} className="loginPage">
                <input type="text" name="roll_number" value={formvalues.roll_number} placeholder="Roll Number" onChange={userHandler}/>
                <p className='loginerror'>{formerror.roll_number}</p>
                <input type="password" name="password" value={formvalues.password} placeholder="Password" onChange={userHandler}/>
                <p className='loginerror'>{formerror.password}</p>
                <input type="submit" value="LogIn" className='logInsubmit'/>
            </form>
            <NavLink to="/forgetPassword" className="forgetPassword">Forgotten Password?</NavLink>
            <h4>Not Have An Account?</h4>
            
            <button  className="register" onClick={userRegister}>Register</button>
            
        </div>
        {/* <div className={iscredentials?"successfulLogin":"hide"}>
       <p>Invalid Mobile Number or Password</p>
    </div> */}
    </div>
    </>
  )
}

export default AdminLogin
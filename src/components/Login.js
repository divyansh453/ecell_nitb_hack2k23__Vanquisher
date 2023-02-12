import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Navigate, NavLink, useNavigate } from 'react-router-dom';
import "../styles/Login.css";


export let profile_data={
    id:"",
    name:"",
    email:"",
    mobile_no:"",
    age:"",
}

const Login = () => {
    const initialvalues={
        mobile_number:"",
        password:""
    }
    const navigate=useNavigate();
    const [formvalues,setformvalues]=useState(initialvalues);
    const [submitcall,setSubmitcall]=useState(false);
    const [loading,setLoading]=useState(false);

    const userHandler=(e)=>{
        const {name,value}=e.target;
        setformvalues({...formvalues,[name]:value});
    }
    

    const submitHandler=(e)=>{
        e.preventDefault();
        if(submitcall==false){
        setSubmitcall(true);
        }
        else{
            setSubmitcall(false);
        }
    }

    useEffect(()=>{
        
            axios.post("https://web-production-0189.up.railway.app/accounts/login/",{
                mobile_number:formvalues.mobile_number,
                password:formvalues.password
            }).then((res)=>{
                console.log(res)
                profile_data.id=res.data.profile_data.id;
                console.log(profile_data);
                localStorage.setItem("login","active");
                localStorage.setItem("profile_id",profile_data.id);
                localStorage.setItem("profile_name",profile_data.name);
                // setLoading(false);
                navigate("/home");
            }).catch((err)=>{
                console.log(err);
                // setLoading(false);
                // setIscredentials(true);
                // setTimeout(()=>{
                //     s
                // },3000)
            })
            // console.log(formvalues);
        
    },[submitcall])


    return(
        <>

    <div className='login'>
        
        <div class="loginControls">
        {/* <h1>CarGo.</h1> */}
            <form onSubmit={submitHandler} className="loginPage">
                <input type="text" name="mobile_number" value={formvalues.mobile_number} placeholder="Roll Number" onChange={userHandler}/>
                <input type="password" name="password" value={formvalues.password} placeholder="Password" onChange={userHandler}/>
                <input type="submit" value="LogIn" className='logInsubmit'/>
            </form>
            <NavLink to="/forgetPassword" className="forgetPassword">Forgotten Password?</NavLink>
            <h4>Not Have An Account?</h4>
            
            <button  className="register">Register</button>
            
        </div>
        {/* <div className={iscredentials?"successfulLogin":"hide"}>
       <p>Invalid Mobile Number or Password</p>
    </div> */}
    </div>
    </>
  )
}

export default Login
import React,{useState,useRef} from 'react';
import "../styles/Myprofile.css";
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
   
let skills_sec=[];
const top100Films=[
  {
    label:'Frontend Developer',
  },
  {
    label:'Backend Developer',
  },
  {
    label:'Machine Learning',
  }
]

const Myprofile = () => {
    const initialvalues={
        employment:"",
        skills:skills_sec,
        cgpa:"",
        job_title:"",
        company:"",
        placement:"",
        package:"",
        resource:"",

    }
    const skillsref=useRef();
    const [formvalues,setformvalues]=useState(initialvalues);
    const [skill,setskill]=useState("")

    const userHandler=(e)=>{
        const {name,value}=e.target;
        setformvalues({...formvalues,[name]:value})
    }

    const submitHandler=(e)=>{
      e.preventDefault();
        // axios.post("https://ecellnitbhack2k23vanquisher-production.up.railway.app/info_student/student_form/2",{
        //   student:2,
        //   skills:skills_sec,
        //   employment_type:formvalues.employment,
        //   package:formvalues.package,
        //   company:formvalues.company,
        //   resources:formvalues.resource,
        //   placement:formvalues.placement,
        //   cgpa:formvalues.cgpa,
        // }).then((res)=>{
        //   console.log(res)
        // }).catch((err)=>{
        //   console.log(err)
        // })
        console.log(formvalues);
    }

    

    const updateskills=(skillsref)=>{
      console.log(skill)
      skills_sec.push(skill)
      console.log(skills_sec)
    }
  return (
    <div className='myprofile'>
        <form onSubmit={submitHandler}>
            <div>
              <label>Name</label>
              <input type="text" name='name' value="" onChange={userHandler}/>
            </div>

            <div>
              <label>University Roll No.</label>
              <input type="text" name='roll' value="" onChange={userHandler}/>
            </div>



            <div>
            <label>Employment Type</label>
            <select name="employment" id="employment" value={formvalues.employment} onChange={userHandler}>
                <option value="" disabled selected>Select</option>
              <option value="Internship">Internship</option>
              <option value="Placement">Placement</option>
           </select>
            </div>

            <div>
            <label>Placement</label>
            <select name="placement" id="placement" value={formvalues.placement} onChange={userHandler}>
                <option value="" disabled selected>Select</option>
              <option value="Internship">OnCampus</option>
              <option value="Placement">OffCampus</option>
           </select>
            </div>


            <div>
              <input type="text" name="skills" onChange={(e)=>setskill(e.target.value)}/>
              <p onClick={updateskills}>Ok</p>
              
            </div>

            

            <div>
            <label>Job Title</label>
               <input type="text" name="job_title" value={formvalues.job_title} onChange={userHandler}/>
            </div>


            <div>
              <label>CGPA</label>
              <input type="text" name='cgpa' value={formvalues.cgpa} onChange={userHandler}/>
            </div>

            <div>
              <label>Company</label>
              <input type="text" name='company' value={formvalues.company} onChange={userHandler}/>
            </div>

            <div>
              <label>Package</label>
              <input type="text" name='package' value={formvalues.package} onChange={userHandler}/>
            </div>

            <div>
                <label>Resources (Optional)</label>
                <textarea id="resources" name="resources" rows="4" cols="50" onChange={userHandler}>
                {formvalues.resource}
                    </textarea>
            </div>

            <input type="submit"/>
            
        </form>
    </div>
  )
}

export default Myprofile
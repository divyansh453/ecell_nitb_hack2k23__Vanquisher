import React from 'react';
import "../styles/Navbar.css";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate=useNavigate();
  const movetojob=()=>{
    navigate("/seekjob");
  }
  return (
    <div className='navbar'>
        <h2 style={{color:"blue"}}>Carrersome</h2>
        <ul>
            <Link to="/profile" className='navlist'>Dashboard</Link>
            <Link to="/statistics" className='navlist'>Statistics</Link>
            <Stack spacing={0} direction="row"  className='navlist'>
              <Button variant="contained" onClick={movetojob}>Seek Job</Button>
           </Stack>
        </ul>
    </div>
  )
}

export default Navbar
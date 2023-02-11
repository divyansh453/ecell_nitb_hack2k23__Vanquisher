import React from 'react';
import "../styles/Navbar.css";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className='navbar'>
        <h2>Logo</h2>
        <ul>
            <Link to="/" className='navlist'>Dashboard</Link>
            <Stack spacing={2} direction="row"  className='navlist'>
              <Button variant="contained">Seek Job</Button>
           </Stack>
        </ul>
    </div>
  )
}

export default Navbar
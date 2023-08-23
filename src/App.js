import React from 'react';
import './App.css';
import Myprofile from './components/Myprofile';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Records from './components/Records';
import Statistics from './components/Statistics';
import Admin from './components/Admin';
import Seek from './components/Seek';
import Resume from './components/Resume';
import { Route,Routes } from "react-router-dom";
import Login from './components/Login';
import Corporation from './components/Corporation';
import AdminHome from './components/AdminHome';
import AdminLogin from './components/AdminLogin';
import AdminMail from './components/AdminMail';

function App() {
  return (
    <div className="App">
      {/* <Navbar/> */}
      <Routes>
        
        <Route path="/" element={<Login/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/admin" element={<AdminLogin/>}/>
        <Route path="/admin-home" element={<AdminHome/>}/>
        <Route path="/profile" element={<Myprofile/>}/>
        <Route path="/seekjob" element={<Seek/>}/>
        <Route path="/statistics" element={<Statistics/>}/>
        <Route path="/records" element={<Records/>}/>
        <Route path="/resume" element={<Resume/>}/>
        <Route path="/corporation" element={<Corporation/>}/>
        <Route path="/admin-mail" element={<AdminMail/>}/>
      </Routes>
    </div>
  );
}

export default App;

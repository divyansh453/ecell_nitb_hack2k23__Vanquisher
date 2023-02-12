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

function App() {
  return (
    <div className="App">
      {/* <Navbar/> */}
      <Routes>
        
        <Route path="/" element={<Login/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/admin" element={<Admin/>}/>
        <Route path="/profile" element={<Myprofile/>}/>
        <Route path="/seekjob" element={<Seek/>}/>
        <Route path="/statistics" element={<Statistics/>}/>
        <Route path="/records" element={<Records/>}/>
        <Route path="/resume" element={<Resume/>}/>
        <Route path="/corporation" element={<Corporation/>}/>
      </Routes>
    </div>
  );
}

export default App;

import React from 'react';
import './App.css';
import Myprofile from './components/Myprofile';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Records from './components/Records';
import Statistics from './components/Statistics';
import Seek from './components/Seek';
import { Route,Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      {/* <Navbar/> */}
      <Routes>
        
        <Route path="/" element={<Home/>}/>
        <Route path="/profile" element={<Myprofile/>}/>
        <Route path="/seekjob" element={<Seek/>}/>
        <Route path="/statistics" element={<Statistics/>}/>
        <Route path="/records" element={<Records/>}/>
      </Routes>
    </div>
  );
}

export default App;

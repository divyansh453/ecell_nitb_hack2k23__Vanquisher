import React from 'react';
import './App.css';
import Myprofile from './components/Myprofile';
import { Route,Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/profile" element={<Myprofile/>}/>
      </Routes>
    </div>
  );
}

export default App;

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import Navbar from "./components/Navbar";
import {useState } from "react"
import Home from "./components/Home";
import Updatedata from "./components/Updatedata";
import Services from "./components/Services";

function App() {
  const [present , setPresent] = useState(null);

  return (
    <>
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home present={present} setPresent={setPresent}/>}></Route>
        <Route exact path='/services' element={<Services />}></Route>
        <Route exact path="/updatedata" element={<Updatedata />}></Route>
      </Routes>
    </Router>
    </>
  );
}

export default App;

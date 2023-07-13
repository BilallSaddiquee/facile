import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Landing from "./components/Landing";

function App() {
  return (
    <div className="App">
     <BrowserRouter>
      <Routes>     
      <Route path="/sign" element={<SignUp />}></Route> 
      <Route path="/login" element={<Login />}></Route> 
      <Route path="/" element={<Landing />}></Route> 
       
      </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;

import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import SignUp from "./components/SignUp";
import Login from "./components/Login";

function App() {
  return (
    <div className="App">
     <BrowserRouter>
      <Routes>     
      <Route path="/" element={<SignUp />}></Route> 
      <Route path="/login" element={<Login />}></Route> 
       
      </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;

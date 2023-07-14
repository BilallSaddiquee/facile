import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Landing from "./components/Landing";
import Create_workspace from "./components/Create_workspace";

function App() {
  return (
    <div className="App">
     <BrowserRouter>
      <Routes>     
      <Route path="/signup" element={<SignUp />}></Route> 
      <Route path="/login" element={<Login />}></Route> 
      <Route path="/" element={<Landing />}></Route> 
      <Route path="/work" element={<Create_workspace />}></Route> 
       
      </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;

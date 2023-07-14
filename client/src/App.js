import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Landing from "./components/Landing";
import Create_workspace from "./components/Create_workspace";
import CoworkerLogin from "./components/CoworkerLogin";
import CoworkerSignup from "./components/CoworkerSignUp";
function App() {
  return (
    <div className="App">
     <BrowserRouter>
      <Routes>     
      <Route path="/sign" element={<SignUp />}></Route> 
      <Route path="/login" element={<Login />}></Route> 
      <Route path="/" element={<Landing />}></Route> 
      <Route path="/work" element={<Create_workspace />}></Route> 
      <Route path="/coworkersignup" element={<CoworkerSignup />}></Route> 
      <Route path="/coworkerlogin" element={<CoworkerLogin />}></Route> 
      </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;

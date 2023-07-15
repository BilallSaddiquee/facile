import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Landing from "./components/Landing";
import Chatpage from "./components/Chatpage";

function App() {


  return (
    <div className="App"> 
     <BrowserRouter>
      <Routes>     
      <Route path="/Singup" element={<SignUp />}></Route> 
      <Route path="/login" element={<Login />}></Route> 
      <Route path="/lan" element={<Landing />}></Route> 
      <Route path="/" element={<Chatpage />}></Route> 


      </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;

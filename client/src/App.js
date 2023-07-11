import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Signup from "./components/signUp";
import Login from   "./components/login";
function App() {
  return (
    <div className="App">
     <BrowserRouter>
      <Routes>     
      <Route path="/" element={<Signup />}></Route>          
      </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;

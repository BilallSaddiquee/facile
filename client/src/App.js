import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Signup from "./components/signUp";
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

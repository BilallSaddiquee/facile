import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import SignUp from "./components/SignUp";

function App() {
  return (
    <div className="App">
     <BrowserRouter>
      <Routes>     
      <Route path="/" element={<SignUp />}></Route>          
      </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;

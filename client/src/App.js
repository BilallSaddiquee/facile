import React, { useState, createContext } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Landing from "./components/Landing";
import Create_workspace from "./components/Create_workspace";
import CoworkerLogin from "./components/CoworkerLogin";
import CoworkerSignup from "./components/CoworkerSignUp";
import Chatpage from "./components/Chatpage";
import GroupMember from "./components/GroupMember";
import AddMember from "./components/AddMember";

const workspace_Context = createContext();

function App() {
  const [workid, setworkid] = useState("");

  return (
    <workspace_Context.Provider value={{ workid, setworkid }}>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/sign" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/land" element={<Landing />} />
            <Route path="/work" element={<Create_workspace />} />
            <Route path="/coworkersignup" element={<CoworkerSignup />} />
            <Route path="/coworkerlogin" element={<CoworkerLogin />} />
            <Route path="/chat" element={<Chatpage />} />
            <Route path="/group" element={<GroupMember />} />
            <Route path="/" element={<AddMember />} />
          </Routes>
        </BrowserRouter>
      </div>
    </workspace_Context.Provider>
  );
}

export default App;
export { workspace_Context };

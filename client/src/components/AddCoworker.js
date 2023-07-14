import react, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import axios from "axios";
function AddCoworker({ onClose }){
 
  const [email, setEmail] = useState("");
  const [err, seterr] = useState(false);
 const[errors,setErrors]=useState("");
  

  function Addworker() {
    let regex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
    if (email === "") {
      setErrors("Email is Required");
      seterr(true);
    } else if (!regex.test(email)) {
      seterr(true)
      setErrors("Invalid Email");
    }else{

    }
  
  };


const EmailHandler = (e) => {
    let regex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");

    setEmail(e.target.value);
    if (e.target.value === "") {
      seterr(true);
      setErrors("Email is Required");
    } else if (!regex.test(e.target.value)) {
      seterr(true);
      setErrors("Invalid Email");
    } else {
      seterr(false);
    }
  };


 

 
  return (
    <>



      <div className="container-fluid">
        
      <input
            type="email"
            placeholder="Email"
            autoComplete="on"
            onChange={EmailHandler}
            value={email}
          />
          {err ? (
            <span style={{ color: "rgb(247, 14, 14)" }}>
              {errors}
            </span>
          ) : (
            ""
          )}
          <button onClick={Addworker}>Send Invite</button>
          <button onClick={onClose}>Close</button>
         
        </div>
       
        
    
    </>
  );
}

export default AddCoworker;

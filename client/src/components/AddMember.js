import react, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import img1 from "../images/logofecile.png";

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
      <style>
        {
          `

          img {
            margin: 10px;
          }

          h2 {
            paddingTop: 10px;
            font-size: 3rem;
            line-height: 1;
            display: flex;
            marginLeft: 10px;
            }

          span{
            margin: 10px;
          }


          header-coworker button{
            grid-column: 1 / span 2;
            justify-self: center;
            margin-top: 1rem;
          }
          button {
            font-size: 1.7rem;
            padding: 8px;
            margin: 3px;
            border: 1px solid #ddd;
            border-radius: 0.5rem;
            }
          
          input {
              font-size: 1.7rem;
              padding: 10px;
              width: 100%;
              margin: 4px;
              border: 1px solid #ddd;
              border-radius: 0.5rem;
            }
          `
        }
      </style>


      <div className="header-coworker">
        <img src={img1} alt="Facile" className="nav__logo" id="logo" />
          <h2>
              Add a Member
            </h2>
            <h3>
              Name:
            </h3>
        <input
              type="Text"
              placeholder="Search Name"
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
            <button onClick={Addworker}>Confirm</button>
            <button onClick={onClose}>Close</button>
          
        </div>
       
        
    
    </>
  );
}

export default AddCoworker;

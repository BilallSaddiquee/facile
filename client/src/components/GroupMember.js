import react, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import img1 from "../images/logofecile.png";
import img2 from "../images/second.png";
import img3 from "../images/teamwork.jpg";

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


          Group-Member button{
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

          /* GroupMemberForm.css */
            .box {
            background-color: #eef2f5;
            width: 40%;
            margin-top: 150px;
            margin-left: 400px;
            }

            .box img {
            margin-top: 15px;
            margin-left: 250px;
            }

            .heading {
            text-align: center;
            margin-right: 25px;
            padding-top: 10px;
            }
            .heading h2{
            font-size: 28px;
            }
            .form h3 {
            text-align: center;
            }

            .scl {
            background-color: #dad5d5;
            background: #f4f7f4;
            color: rgb(235, 4, 4);
            padding: 10px;
            width: 94%;
            height: 150px;
            overflow: scroll;
            }

            .scl img {
            margin-top: 10px;
            margin-left: 20px;
            }

            .form button {
            border: none;
            color: rgb(238, 227, 227);
            padding: 15px 32px;
            text-align: center;
            text-decoration: none;
            display: inline-block;
            font-size: 16px;
            margin: 4px 2px;
            cursor: pointer;
            margin-left: 175px;
            background-color: #0987db;
            border-radius: 20px;
            }

            .form button:hover {
            background-color: orange;
            }

            form.example input[type=text] {
            padding: 10px;
            font-size: 17px;
            border: 1px solid grey;
            float: left;
            width: 80%;
            background: #f1f1f1;
            }

            form.example button {
            float: left;
        lay: table;
            }
          `
        }
      </style>

      <div className="Group-member">
        <img src={img1} alt="Facile" className="nav__logo" id="logo" />
            <div className="heading">
                <h2>Add group member</h2>
            </div>
            <h3>
              Name:
            </h3>
        <div className="form">
        <form className="example" action="" style={{ margin: 'auto', maxWidth: '300px' }}>
          <input type="text" placeholder="Search.." name="search2" />
        </form>
        <button className="button button1" style={{ marginTop: '10px' }}>Add a member</button>
        <div className="scl">
          <img src={img2} alt="" width="50" height="50" /><br />
          <img src={img3} alt="" width="50" height="50" /><br />
          <img src={img2} alt="" width="50" height="50" /><br />
          <img src={img3} alt="" width="50" height="50" /><br />
          <img src={img2} alt="" width="50" height="50" /><br />
          <img src={img3} alt="" width="50" height="50" />
        </div>
            <button onClick={Addworker}>Confirm</button>
            <button onClick={onClose}>Close</button>
          
        </div>
      </div>

       
        
    
    </>
  );
}

export default AddCoworker;

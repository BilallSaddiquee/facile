import react, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import img1 from "../images/Facebook.png";
import img3 from "../images/instagram.png";
import img4 from "../images/Linkdin.png";
import img2 from "../images/signinlogo.png";
import axios from "axios";
function Create_workspace({ onClose }){
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");

  
  const [err, seterr] = useState(false);
 const[errors,setErrors]=useState("");
  const [checkemail, setcheckE] = useState(false)
  const [checkpass, setcheckP] = useState(false)

  const [name, setName] = useState("");
  const [workSpacename, setWorkSpaceName] = useState("");
  const [Description, setDescription] = useState("");

  function login() {
    let regex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
    if (name === "") {
      setErrors("Email is Required");
      seterr(true);
      //seterr("Email is Required");
    } else if (workSpacename === "") {
        setErrors("WorkSpace Name is Required");
        seterr(true);
        //seterr("Email is Required");
      } 
    else if (Description === "") {
        setErrors("Description is Required");
        seterr(true);
        //seterr("Email is Required");
      } 
     else{

      axios.post("http://localhost:3000/login", {
        email: email,
        password: password,
      }).then((res) => {
        
        console.log(res);
        
        

      })
    }
  
  };




  //Set value and check errors of Email using regex
  const nameHandler = (e) => {
    setName(e.target.value);
    if (e.target.value === "") {
      setErrors("Name is Required");
      seterr(true);
    } else {
      seterr(false);
    }
  };
  const worknameHandler = (e) => {
    setWorkSpaceName(e.target.value);
    if (e.target.value === "") {
      setErrors("Work Space Name is Required");
      seterr(true);
    } else {
      seterr(false);
    }
  };

  const desHandler = (e) => {
    setDescription(e.target.value);
    if (e.target.value === "") {
      setErrors("Discription is Required");
      seterr(true);
    } else {
      seterr(false);
    }
  };
  return (
    <>
      <style>
        {`                    
body {
     position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      backdrop-filter: blur(4px);
      z-index: 100;
      transition: all 0.5s;
  }
  
  .container-fluid {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #f1f1f1;
    padding: 20px;
    border-radius: 10px;
    width: 500px;
    height: 550px;
  }
  
  .top1 {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
    padding: 20px;
    background-color: #2f7df6;
    color: white;
    border-radius: 10px;
  }
  
  .logo1 img {
    width: 100px;
    height: 100px;
    margin: 0 20px;
  }
  
  .name1 h1 {
    width: 20%
    font-weight: 100;
    font-size: xx-large;
    flex-grow: 1;
  }
  
  .input1 {
   display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 7px;
  }
  
  .input1 input {
    margin-bottom: 10px;
    padding: 12px;
    border-radius: 4px;
    border: 1px solid #ccc;
    width: 400px;
    color: #2f7df6;
    text-decoration: none;
  }
  
  .forgot-password1 {
    align-self: flex-end;
  }
  
  .input1 a {
    lign-self: flex-end;
    color: #2f7df6;
    text-decoration: none;
  }
  
  .input1 a:hover {
    color: rgb(57, 9, 119);
    text-decoration: underline;
  }
  .input1 textarea{
    border-radius: 4px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    height: 180px;
    width: 400px;
  }
  .input1 button{
    width: 400px;
  }
  
  button {
    padding: 10px 20px;
    background-color: #2f7df6;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin: 5px;
  }
  
  button:hover {
    background-color: #072e69;
    color: grey;
  }
  
  .using1 {
    text-align: center;
    margin-top: 0;
  }
  
  
  
                    `}
      </style>


      <div className="container-fluid">
        <div className="top1">
          <div className="logo1">
            <img src={img2} alt="" />
          </div>
          <div className="name1">
            <h1>Create Workspace</h1>
          </div>
        </div>
        <div className="input1">
          <input
            type="name"
            placeholder="Your Name"
            autoComplete="on"
            onChange={nameHandler}
            value={name}
          />
          <input
            type="WorkSpaceName"
            placeholder="Work Space  Name"
            autoComplete="on"
            onChange={worknameHandler}
            value={workSpacename}
          />
       <textarea
            className="textarea"
            type="Description"
            placeholder=" Description"
            autoComplete="on"
            onChange={desHandler}
            value={Description}
          />
          {err ? (
            <span style={{ color: "rgb(247, 14, 14)" }}>
              {errors}
            </span>
          ) : (
            ""
          )}
          <button onClick={login}>Create WorkSpace</button>
          <button onClick={onClose}>Close</button>
         
        </div>
       
        
      </div>
    </>
  );
}

export default Create_workspace;

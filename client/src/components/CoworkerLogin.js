import react, { useState, useEffect } from "react";
import { Link,useNavigate } from "react-router-dom";
import img1 from "../images/Facebook.png";
import img3 from "../images/instagram.png";
import img4 from "../images/Linkdin.png";
import img2 from "../images/signinlogo.png";
import axios from "axios";
function CoworkerLogin() {
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [err, seterr] = useState(false);
 const[errors,setErrors]=useState("");

  const navigate=useNavigate();
  function CoworkerLogin() {
    let regex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
    if (email === "") {
      setErrors("Email is Required");
      seterr(true);
    } else if (!regex.test(email)) {
      seterr(true)
      setErrors("Invalid Email");
    }
    else if (password.length < 8) {
      setErrors("Password must be greater then 8");
      seterr(true);
    }
     else{

      axios.post("http://localhost:3000/loginCo-worker", {
        email: email,
        password: password,
      }).then((res) => {
        if (res.data === "Incorrect email or password") {
          setErrors("Incorrect Email")
          seterr(true)        
        }
        else if (res.data === "Incorrect password") {
          seterr(true)
          setErrors("Incorrect Password")
 
        } else if (res.data.userId !== "") {
            seterr(false)
            setErrors("");
            console.log("helo",res.data.userId)
            localStorage.setItem('email_token', res.data.userId)
            navigate('/Chatpage');
          }
     

      })
    }
  
  };




  //Set value and check errors of Email using regex
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

  const passHandler = (e) => {
    setPass(e.target.value);
    if (e.target.value.length < 8) {
      setErrors("Password must be greater then 8");
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
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
    font-family: Arial, sans-serif;
  }
  
  .container-fluid {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #f1f1f1;
    padding: 20px;
    border-radius: 10px;
    height: 500px;
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
  
  .name1 {
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
    width: 300px;
  }
  
  .forgot-password1 {
    align-self: flex-end;
  }
  
  .input1 a {
    color: #2f7df6;
    text-decoration: none;
  }
  
  .input1 a:hover {
    color: rgb(57, 9, 119);
    text-decoration: underline;
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
  
  .socials1 {
    display: flex;
    justify-content: center;
    margin-top: 0px;
  }
  
  .socials1 img {
    width: 40px;
    height: 40px;
    margin: 0 5px;
  }
  
                    `}
      </style>


      <div className="container-fluid">
        <div className="top1">
          <div className="logo1">
            <img src={img2} alt="" />
          </div>
          <div className="name1">
            <h1>CoWorker CoworkerLogin</h1>
          </div>
        </div>
        <div className="input1">
          <input
            type="email"
            placeholder="Email"
            autoComplete="on"
            onChange={EmailHandler}
            value={email}
          />
  
          <input
            type="password"
            placeholder="Password"
            required
            onChange={passHandler}
            value={password}
            autocomplete="on"
          />
          {err ? (
            <span style={{ color: "rgb(247, 14, 14)" }}>
              {errors}
            </span>
          ) : (
            ""
          )}
          <a href="">forgot password?</a>
          <button onClick={CoworkerLogin}>CoworkerLogin</button>
          <p>
            Don't have a account?<Link to="/coworkersignup">SignUp</Link>
          </p>
        </div>
        <div className="using1">
          <p>Log in using</p>
        </div>
        <div className="socials1">
          <img src={img4} alt="" />
          <img src={img3} alt="" />
          <img src={img1} alt="" />
        </div>
      </div>
    </>
  );
}

export default CoworkerLogin;

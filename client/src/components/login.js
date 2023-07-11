import react from 'react';
import { Link } from "react-router-dom";
import img1 from '../images/Facebook.png';
import img3 from '../images/instagram.png';
import img4 from '../images/Linkdin.png';
import img2 from "../images/signinlogo.png";
function Login() {

    return (
        <>
            <style>
                {
                    `                    
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
    margin-bottom: 20px;
  }
  
  .input1 input {
    margin-bottom: 20px;
    padding: 8px;
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
    margin: 10px;
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
    margin-top: 5px;
  }
  
  .socials1 img {
    width: 50px;
    height: 50px;
    margin: 0 5px;
  }
  
                    `
                }
            </style>
            <div className="container-fluid">
                <div className="top1">
                    <div className="logo1">
                        <img src={img2} alt="" />
                    </div>
                    <div className="name1">
                        <h1>Welcome To Fecile</h1>
                    </div>
                </div>
                <div className="input1">
                    <input type="email" placeholder="Email" required />
                    <input type="password" placeholder="Password" required />
                    <a href="">forgot password?</a>
                    <button>Sign In</button>
                    <p>Don't have a account <Link to="/">SIGN In</Link></p>
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

export default Login;
import React, { useState, useRef, useEffect,  } from "react";
import { useNavigate, Link,useLocation } from "react-router-dom";
import img1 from "../images/Facebook.png";
import img2 from "../images/Illustration.png";
import img3 from "../images/instagram.png";
import img4 from "../images/Linkdin.png";
import img5 from "../images/logo.png";
import "../styles/signup.css";
import Axios from "axios";
import CoworkerLogin from "./CoworkerLogin";

function CoworkerSignup() {

 
 
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const workSpaceID = queryParams.get("id");
  console.log(workSpaceID);

  useEffect(() => {
    console.log("workSpaceID:", workSpaceID);
  }, [workSpaceID]);

  const [openModal, setOpenModal] = useState(false);
  const [showCoLoginPopup, setShowCoLoginPopup] = useState(false);
  const [workID, setworkID] = useState("");
  const handleCoworkerLoginClick = () => {
    setShowCoLoginPopup(true);
  };

  useEffect(() => {
    setworkID(localStorage.getItem("workID"));
  }, []);

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [Cpassword, setCPass] = useState("");
  const [name, setName] = useState("");

  const [checkEmail, setCheck] = useState("");

  const [err, seterr] = useState(false);
  const [errors, setErrors] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);
  };





  //adding form validation to set errors in input fields and hitting post api to check users have already account or not.
  //after that calling post api to send data in database using axios
  const register = () => {
    setworkID(localStorage.getItem("workID"));
    console.log(localStorage.getItem("workID"));
    let regex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
    // Axios.post("http://localhost:3006/getEmail", {
    //     email: email,
    //   }).then((response) => {
    //     console.log("HELO  : ", response.data);
    //     setCheck(response.data);
    //   });
    if (name === "") {
      setErrors("Name is Required");
      seterr(true);
    } else if (email === "") {
      setErrors("Email is Required");
      seterr(true);
      //seterr("Email is Required");
    } else if (!regex.test(email)) {
      setErrors("Invalid Email");

      // seterr("Invalid Email");
    } else if (checkEmail === "already") {
      setErrors("Email Already Exist");
      seterr(true);
      // seterr("Email Already Exist");
    } else if (password.length < 8) {
      setErrors("Password must be greater then 8");
      seterr(true);
    } else if (password !== Cpassword) {
      setErrors("Password Desn't Match");
      seterr(true);
    } else {
      seterr(false);
      setErrors("");
      Axios.post("http://localhost:3000/co-workers", {
        name: name,
        password: password,
        email: email,
        workspaceIds: workID,
        //image:capturedImage
      }).then((response) => {
        console.log(response);

        setShowCoLoginPopup(true);
      });
    }
  };
  //Set value and check errors of Email using regex
  const EmailHandler = (e) => {
    let regex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");

    setEmail(e.target.value);
    // Axios.post("http://localhost:3006/getEmail", {
    //   email: e.target.value,
    // }).then((response) => {
    //   console.log("HELO  : ", response.data);
    //   setCheck(response.data);
    // });

    if (e.target.value === "") {
      //seterr("Email is Required");
      setErrors("Email is Required");
      seterr(true);
    } else if (!regex.test(e.target.value)) {
      // seterr("Invalid Email");
      setErrors("Invalid Email");
      seterr(true);
    } else if (checkEmail === "already") {
      // seterr("Email Already Exist");
      setErrors("Email Already Exist");
      seterr(true);
    } else {
      seterr(false);
    }
  };
  //Set value and check errors of Password
  const passHandler = (e) => {
    setPass(e.target.value);
    if (e.target.value.length < 8) {
      seterr(true);
      setErrors("Password must be greater then 8");
    } else {
      seterr(false);
    }
  };
  //Set value and check errors of Name
  const nameHandler = (e) => {
    setName(e.target.value);
    if (e.target.value === "") {
      setErrors("Name is Required");
      seterr(true);
    } else {
      seterr(false);
    }
  };

  //Set values and matching with password also check errors
  const CpassHandler = (e) => {
    setCPass(e.target.value);
    if (e.target.value === "") {
      seterr(true);
      setErrors("Confirm Password Required");
    } else if (password !== e.target.value) {
      setErrors("Password Desn't Match");
      seterr(true);
    } else {
      seterr(false);
    }
  };

  return (
    <div className="container">
      <div className="illu">
        <img src={img2} alt="" />
      </div>
      <div className="left-section">
        <div className="logo">
          <img src={img5} alt="" />
        </div>
      </div>
      <div className="form-container">
        <div className="form-header">
          <h2>Create your account as Coworker</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="input">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={nameHandler}
            />
          </div>

          <div className="input">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={EmailHandler}
            />
          </div>

          <div className="input">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={passHandler}
            />
          </div>

          <div className="input">
            <input
              type="password"
              placeholder="Confirm Password"
              value={Cpassword}
              onChange={CpassHandler}
            />
          </div>

          {err ? (
            <span
              className="error-message"
              style={{
                color: "rgb(247, 14, 14)",
                "font-size": "14px",
                "text-align": "center",
                "margin-top": "0",
                display: "absolute",
                "index-z": "-1",
              }}
            >
              {errors}
            </span>
          ) : (
            ""
          )}

          <div className="buttons-row">
            <button type="submit" onClick={register}>
              Sign Up
            </button>
            <button>Face Auth</button>
          </div>
        </form>
        <p>
          Already Have Account?{" "}
          <Link to="#" onClick={handleCoworkerLoginClick}>
            Log In
          </Link>
        </p>

        {showCoLoginPopup && (
          <div className="popup-container">
            <div className="popup">
              <CoworkerLogin onClose={() => setShowCoLoginPopup(false)} />
            </div>
          </div>
        )}
        <div className="form-separator">
          <p>OR</p>
        </div>
        <div className="login-through">
          <p>Login through</p>
          {/*  */}
        </div>
        <div className="logos-row">
          <img src={img4} alt="Logo 1" />
          <img src={img3} alt="Logo 2" />
          <img src={img1} alt="Logo 3" />
        </div>
      </div>
      {openModal && <CoworkerLogin />}
    </div>
  );
}
export default CoworkerSignup;

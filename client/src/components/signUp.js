import React, { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import img1 from "../images/Facebook.png";
import img2 from "../images/Illustration.png";
import img3 from "../images/instagram.png";
import img4 from "../images/Linkdin.png";
import img5 from "../images/logo.png";
import "../styles/signup.css";
import Axios from "axios";
import Login from "./Login";

function SignUp() {
  const [openModal, setOpenModal] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  const handleSignUpClick = () => {
    setShowLoginPopup(true);
  };

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [Cpassword, setCPass] = useState("");
  const [name, setName] = useState("");
  const [contact, setcontact] = useState("");

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
    } else if (contact.length < 11 || /^\d+$/.test(contact) === false) {
      setErrors("Invalid Contact Number");
      seterr(true);
    } else {
      seterr(false);
      setErrors("");
      console.log(name, email, password, contact);
      Axios.post("http://localhost:3000/signup", {
        name: name,
        password: password,
        contact: contact,
        email: email,
        //image:capturedImage
      }).then((response) => {
        console.log(response);
      
        setShowLoginPopup(true);
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
  //Set value and check errors of Contact using regex
  const contactHandler = (e) => {
    const re = /^[0-9\b]+$/;
    if (re.test(e.target.value) && e.target.value.length <= 11) {
      setcontact(e.target.value);
      setErrors("Invalid Contact Number");
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

  //CODE OF WEB RTC
  //   const [videoStream, setVideoStream] = useState(null);
  //   const videoRef = useRef(null);
  //   const canvasRef = useRef(null);

  //   const [isStreaming, setIsStreaming] = useState(false);
  //   const [capturedImage, setCapturedImage] = useState("");

  //   useEffect(() => {
  //     const constraints = { video: true };

  //     const startVideoStream = async () => {
  //       try {
  //         const stream = await navigator.mediaDevices.getUserMedia(constraints);
  //         setVideoStream(stream);
  //         if (videoRef.current) {
  //           videoRef.current.srcObject = stream;
  //         }
  //       } catch (error) {
  //         console.error("Error accessing camera:", error);
  //       }
  //     };

  //     const stopVideoStream = () => {
  //       if (videoStream) {
  //         videoStream.getTracks().forEach((track) => {
  //           track.stop();
  //         });
  //         setVideoStream(null);
  //       }
  //     };

  //     if (isStreaming) {
  //       startVideoStream();
  //     } else {
  //       stopVideoStream();
  //     }

  //     return () => {
  //       stopVideoStream();
  //     };
  //   }, [isStreaming]);

  //   const captureImage = () => {
  //     const video = videoRef.current;
  //     const canvas = canvasRef.current;
  //     canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
  //     const imageData = canvas.toDataURL("image/png");
  //     console.log("Captured image:", imageData);
  //     setCapturedImage(imageData);

  //   };

  //   const toggleStream = () => {
  //     setIsStreaming((prevStreaming) => !prevStreaming);
  //   };

  //   <video
  //   style={{
  //     height: "150px",
  //     width: "250px",
  //     marginLeft: "70px",
  //     marginTop: "20px",
  //   }}
  //   ref={videoRef}
  //   autoPlay
  //   playsInline
  // />
  // <img
  //   style={{
  //     height: "150px",
  //     width: "230px",
  //     marginLeft: "30px",
  //     marginTop: "20px",
  //   }}
  //   src={capturedImage}
  //   alt="Captured"
  // />
  // <canvas ref={canvasRef} style={{ display: "none" }} />
  // <div>
  //   <button className="register-btn" onClick={captureImage}>Capture Image</button>
  //   {isStreaming ? (
  //     <button type="button"  onClick={toggleStream}>Stop Stream</button>
  //   ) : (
  //     <button type="button" onClick={toggleStream}>Start Stream</button>
  //   )}
  // </div>

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
          <h2>Create your account</h2>
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

          <div className="input">
            <input
              type="tel"
              placeholder="Phone No."
              onChange={contactHandler}
              value={contact}
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

        <Link to="#" onClick={handleSignUpClick}>
          Log In
        </Link>

      </p>
      
      {showLoginPopup && (
        <div className="popup-container">
          <div className="popup">
            <Login onClose={() => setShowLoginPopup(false)} />
          </div>
        </div>
      )}
         <div className="form-separator">
          <p>OR</p>
          
        </div>
        <div className="login-through">
          <p>
            Login through
          </p>
          {/*  */}
        </div>
        <div className="logos-row">
          <img src={img4} alt="Logo 1" />
          <img src={img3} alt="Logo 2" />
          <img src={img1} alt="Logo 3" />
        </div>
      </div>
      {openModal && <Login />}
    </div>
  );
}
export default SignUp;

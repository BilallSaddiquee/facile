import React, { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import img1 from "../images/Facebook.png";
import img2 from "../images/Illustration.png";
import img3 from "../images/instagram.png";
import img4 from "../images/Linkdin.png";
import img5 from "../images/logo.png";
import "../styles/signup.css";
import Axios from "axios";
function SignUp() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPass] = useState("");
    const [Cpassword, setCPass] = useState("");
    const [name, setName] = useState("");
    const [contact_number, setcontact] = useState("");
    const [err, seterr] = useState("");
    const [checkEmail, setCheck] = useState("");

    const [errN, seterrN] = useState(false);
    const [errP, seterrP] = useState(false);
    const [errCP, seterrCP] = useState(false);
    const [errE, seterrE] = useState(false);
    const [errCN, seterrCN] = useState(false);


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
      seterrN(true);
    } else if (email === "") {
      seterrE(true);
      seterr("Email is Required");
    } else if (!regex.test(email)) {
      seterrE(true);
      seterr("Invalid Email");
    } else if (checkEmail === "already") {
      seterrE(true);
      seterr("Email Already Exist");
    } else if (
      contact_number.length < 11 ||
      /^\d+$/.test(contact_number) === false
    ) {
      seterrCN(true);
    } else if (password.length < 8) {
      seterrP(true);
    } else if (password !== Cpassword) {
      seterrCP(true);
    } else {
      seterrP(false);
      seterr("");
      seterrN(false);
      seterrCN(false);
      seterrCP(false);
      seterrP(false);
      console.log(name, email, password, contact_number);
      Axios.post("http://localhost:3000/signUp", {
        name: name,
        password: password,
        contact_number: contact_number,
        email: email,
        //image:capturedImage
      }).then((response) => {
        console.log(response);
      });
    }
  }
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
      seterrP(true);
      seterr("Email is Required");
    } else if (!regex.test(e.target.value)) {
      seterrE(true);
      seterr("Invalid Email");
    } else if (checkEmail === "already") {
      seterrE(true);
      seterr("Email Already Exist");
    } else {
      seterrE(false);
    }
  }
//Set value and check errors of Password
  const passHandler = (e) => {
    setPass(e.target.value);
    if (e.target.value.length < 8) {
      seterrP(true);
    } else {
      seterrP(false);
    }
  };
//Set value and check errors of Name
  const nameHandler = (e) => {
    setName(e.target.value);
    if (e.target.value === "") {
      seterrN(true);
    } else {
      seterrN(false);
    }
  };
//Set value and check errors of Contact using regex
  const contactHandler = (e) => {
    const re = /^[0-9\b]+$/;
    if (re.test(e.target.value) && e.target.value.length <= 11) {
      setcontact(e.target.value);
      seterrCN(true);
    } else {
      seterrCN(false);
    }
  };

//Set values and matching with password also check errors  
  const CpassHandler = (e) => {
    setCPass(e.target.value);
    if (e.target.value === "") {
      seterrCP(true);
    } else if (password !== e.target.value) {
      seterrCP(true);
    } else {
      seterrCP(false);
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
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={nameHandler}
          />
          {errN ? (
            <span style={{ color: "#00ffff" }}>Name Is Required</span>
          ) : (
            ""
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={EmailHandler}
          />
          {errE ? <span style={{ color: "#00ffff" }}>{err}</span> : ""}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={passHandler}
          />
          {errP ? (
            <span style={{ color: "#00ffff" }}>
              Password must be greater then 8
            </span>
          ) : (
            ""
          )}
          <input
            type="password"
            placeholder="Confirm Password"
            value={Cpassword}
            onChange={CpassHandler}
          />
          {errCP ? (
            <span style={{ color: "#00ffff" }}>Password Desn't Match</span>
          ) : (
            ""
          )}
          <input
            type="tel"
            placeholder="Phone No."
            onChange={contactHandler}
            value={contact_number}
          />
          {errCN ? (
            <span style={{ color: "#00ffff" }}>Invalid Contact Number</span>
          ) : (
            ""
          )}
          <div className="buttons-row">
            <button type="submit" onClick={register}>
              Sign Up
            </button>
            <button >Face Auth</button>
          </div>
        </form>
        <div className="form-separator">
          <p>OR</p>
        </div>
        <div className="login-through">
          <p>Login through <Link to="/login">Log In</Link></p>
        </div>
        <div className="logos-row">
          <img src={img4} alt="Logo 1" />
          <img src={img3} alt="Logo 2" />
          <img src={img1} alt="Logo 3" />
        </div>
      </div>
    </div>
  );

}
export default SignUp;

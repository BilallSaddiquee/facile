import react, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import emailjs from "emailjs-com";
import axios from "axios";
function AddCoworker({ onClose }) {
  const [email, setEmail] = useState("");
  const [err, seterr] = useState(false);
  const [errors, setErrors] = useState("");
  const navigate = useNavigate();

  function Addworker() {
    let regex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
    if (email === "") {
      setErrors("Email is Required");
      seterr(true);
    } else if (!regex.test(email)) {
      seterr(true);
      setErrors("Invalid Email");
    } else {
    }
  }

  function sendEmail(e) {
    e.preventDefault();
    let regex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
    if (email === "") {
      setErrors("Email is Required");
      seterr(true);
    } else if (!regex.test(email)) {
      seterr(true);
      setErrors("Invalid Email");
    } else {
      const templateParams = {
        email: email,
      };

      emailjs
        .send(
          "service_gnxkngh",
          "template_6k27c9p",
          templateParams,
          "SshR7dvNO5QUpwqIQ"
        )

        .then(
          (result) => {
            console.log("Email sent successfully");
            onClose();
          },
          (error) => {
            console.log("Error sending email:", error.text);
          }
        );

      setEmail("");
    }
  }

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
        {err ? <span style={{ color: "rgb(247, 14, 14)" }}>{errors}</span> : ""}
        <button onClick={sendEmail}>Send Invite</button>
        <button onClick={onClose}>Close</button>
      </div>
    </>
  );
}

export default AddCoworker;

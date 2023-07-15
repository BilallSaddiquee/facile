import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import emailjs from "emailjs-com";
import img1 from "../images/logofecile.png";
import axios from "axios";

function AddCoworker({ onClose }) {
  const [emails, setEmails] = useState("");
  const [err, setErr] = useState(false);
  const [errors, setErrors] = useState("");
  const [inputFocused, setInputFocused] = useState(false);
 const navigate = useNavigate();
  const workSpaceID = localStorage.getItem("workID");

  function Addworker(e) {
    e.preventDefault();
    let regex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
    if (emails === "") {
      setErrors("Emails are required");
      setErr(true);
    } else {
      const emailList = emails.split(",").map((email) => email.trim());
      const invalidEmails = emailList.filter((email) => !regex.test(email));

      if (invalidEmails.length > 0) {
        setErrors("Invalid Email(s): " + invalidEmails.join(", "));
        setErr(true);
      } else {
        const emailPromises = emailList.map((email) => {
          const templateParams = {
            email: email,
            workSpaceID: workSpaceID,
          };

          return emailjs.send(
            "service_gnxkngh",
            "template_6k27c9p",
            templateParams,
            "SshR7dvNO5QUpwqIQ"
          );
        });

        Promise.all(emailPromises)
          .then((results) => {
            console.log("Emails sent successfully");
            navigate('/chatpage')
          })
          .catch((error) => {
            console.log("Error sending emails:", error);
          });
      }
    }
  }

  const EmailsHandler = (e) => {
    setEmails(e.target.value);
    if (e.target.value === "") {
      setErr(true);
      setErrors("Emails are required");
    } else {
      setErr(false);
    }
  };

  const handleInputFocus = () => {
    setInputFocused(true);
  };

  const handleInputBlur = () => {
    setInputFocused(false);
  };

  return (
    <>
      <style>
        {`
          .header-coworker {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            margin-top: 2rem;
          }

          .header-coworker img {
            margin: 10px;
          }

          .header-coworker h2 {
            padding-top: 10px;
            font-size: 3rem;
            line-height: 1;
            display: flex;
            margin-left: 10px;
          }

          .header-coworker span {
            margin: 10px;
            color: rgb(247, 14, 14);
          }

          .header-coworker input.coworkerInput {
            font-size: 1.7rem;
            padding: 10px;
            width: 100%;
            margin: 4px;
            border: 1px solid #ddd;
            border-radius: 0.5rem;
          }

          .btnCoworker {
            display: flex;
            justify-content: center;
            margin-top: 1rem;
          }

          .btnCoworker button {
            font-size: 1.7rem;
            padding: 8px;
            margin: 3px;
            border: 1px solid #ddd;
            border-radius: 0.5rem;
          }

          .btnCoworker button.small {
            padding: 6px;
            font-size: 1.5rem;
          }

          .btnCoworker button.large {
            padding: 10px;
            font-size: 2rem;
          }
        `}
      </style>

      <div className="header-coworker">
        <img src={img1} alt="Facile" className="nav__logo" id="logo" />
        <h2>Invite your co-workers</h2>
        <h3>To:</h3>
        <input
          type="text"
          className="coworkerInput"
          placeholder="Enter email addresses separated by commas"
          autoComplete="on"
          onChange={EmailsHandler}
          value={emails}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
        />
        {err && <span>{errors}</span>}
        <div className={`btnCoworker ${inputFocused ? "large" : "small"}`}>
          <button onClick={Addworker}>Send Invites</button>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </>
  );
}

export default AddCoworker;

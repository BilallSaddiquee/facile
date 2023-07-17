import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import img1 from "../images/logofecile.png";

import axios from "axios";

function CreateChannel({ onClose }) {
  const [name, setname] = useState("");
  const [Description, setDes] = useState("");
  const [err, setErr] = useState(false);
  const [errors, setErrors] = useState("");
  const [inputFocused, setInputFocused] = useState(false);
const navigate= useNavigate();
  function create() {
    const id = localStorage.getItem("workID")
    if (name === "") {
      setErrors("name is Required");
      setErr(true);
    } else if (Description === "") {
      setErrors("Description is Required");
      setErr(true);
    }  else {
      axios.post("http://localhost:3000/channels", {
        name: name,
        description:Description,
        wsId:id
      }).then((res) => {
        navigate('/chatpage')
        onClose()
      
      })
    }
  }

  
  const handleInputFocus = () => {
    setInputFocused(true);
  };

  const handleInputBlur = () => {
    setInputFocused(false);
  };

  const nameHandler = (e) => {

    setname(e.target.value);
    if (e.target.value === "") {
      setErr(true);
      setErrors("name is Required");
    } else {
      setErr(false);
    }
  };
  const DescriptionHandler = (e) => {

    setDes(e.target.value);
    if (e.target.value === "") {
      setErr(true);
      setErrors("Description is Required");
    } else {
      setErr(false);
    }
  };
  return (
    <>
      <style>
        {`
        img#logo {
          margin: 10px;
          width: 50px;
        }

        .header-channel {
          display: flex;
          align-items: center;
          flex-direction: column;
          margin-top: 20px;
        }

        h2 {
          padding-top: 10px;
          font-size: 2rem;
          line-height: 1;
          margin-left: 10px;
        }

        h3 {
          margin: 10px 0;
        }

        textarea,
        input[type="text"] {
          font-size: 1.7rem;
          padding: 10px;
          width: 100%;
          margin: 4px;
          border: 1px solid #ddd;
          border-radius: 0.5rem;
        }

        .header-channel button {
          font-size: 1.7rem;
          padding: 8px;
          margin: 3px;
          border: 1px solid #ddd;
          border-radius: 0.5rem;
          background: blue;
          color: white;
        }

        .error-message {
          color: rgb(247, 14, 14);
        }

        .btnCoworker {
          display: flex;
          margin-top: 10px;
        }

        .btnCoworker button {
          font-size: 1rem;
          padding: 8px;
          margin: 3px;
          border: 1px solid #ddd;
          border-radius: 0.5rem;
          color: white;
        }

        .btnCoworker button.small {
          padding: 6px;
          font-size: 1.5rem;
        }

        .btnCoworker button.large {
          padding: 10px;
          font-size: 2rem;
        }

        .header-channel {
          width: 500px;
        }
      `}
      </style>

      <div className="header-channel">
        <img src={img1} alt="Facile" id="logo" />
        <h2>Create Channel</h2>
        <input
          type="text"
          placeholder="Name"
          autoComplete="on"
          onChange={nameHandler}
          value={name}
        />
        <textarea
          type="text"
          placeholder="Description"
          autoComplete="on"
          onChange={DescriptionHandler}
          value={Description}
        />
        {err && <span className="error-message">{errors}</span>}
        <div className={`btnCoworker ${inputFocused ? "large" : "small"}`}>
          <button onClick={create}>Create Channel</button>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </>
  );
}

export default CreateChannel;

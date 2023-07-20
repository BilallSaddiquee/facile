import React, { useEffect, useState,useRef } from "react";
import axios from "axios";
import { io } from 'socket.io-client';
import img1 from "../images/add-user.png";
import img2 from "../images/logout.png";
import img3 from "../images/group.png";
import img4 from "../images/settings.png";
import img5 from "../images/profile.png";
import img6 from "../images/zoom.png";
import img7 from "../images/microphone.png";
import img8 from "../images/attachment.png";
import img9 from "../images/logofecile.png";
import AddCoworker from "./AddCoworker";
import CreateChannel from "./CreateChannel";
import GroupMember from "./GroupMember";
import { v4 as uuidv4 } from 'uuid';

function Chatpage({ onClose }) {
  const scrollRef = useRef()
  const [addCoworker, setAddPopup] = useState(false);
  const [createGroupPG, setCreateGroupPG] = useState(false);
  const [Addmember, setAddmember] = useState(false);
  const [channels, setChannels] = useState([]);
  const [coworkers, setCoworkers] = useState([]);
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [selectedDirectMessage, setSelectedDirectMessage] = useState(null);
  const [showAddButton, setShowAddButton] = useState(false);
  const [workspaceName, setWorkspaceName] = useState("");
  const workspace_id = localStorage.getItem("workIDss");
  const adminuser = localStorage.getItem("Coworker");
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [corworkerID, setCoworkerID] = useState("");

  useEffect(() => {
    fetchData();

//     const socket = io();

//     socket.on("connect", () => {
//       console.log("Connected to socket.io server");
//     });

//     socket.on("disconnect", () => {
//       console.log("Disconnected from socket.io server");
//     });

//     socket.on("message", (message) => {
//       console.log("Received message:", message);
//       // Add the received message to the state
//       setMessages((prevMessages) => [...prevMessages, message]);
// });
},[])
  // 
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    const socketInstance = io('http://localhost:3000');
    if (adminuser) {
      socketInstance.emit("add-user", adminuser);
    }
    
    setSocket(socketInstance);
  }, [adminuser]);
  
  // useEffect(() => {
  //   const socketInstance = io('http://localhost:3000');

  //   socketInstance.on('connect', () => {
  //     console.log('Connected to Socket.IO server');
  //     socketInstance.emit('add-user', adminuser); // Replace with the appropriate user ID
  //   });

  //   socketInstance.on('disconnect', () => {
  //     console.log('Disconnected from Socket.IO server');
  //   });

  //   setSocket(socketInstance);

  //    return () => {
  //      socketInstance.disconnect();
  //   };
  // }, []);

  const fetchData = () => {
    axios
      .get(`http://localhost:3000/Get_Channels`)
      .then((response) => {
        setChannels(response.data.rows);
      })
      .catch((error) => {
        console.error("Error fetching channels:", error);
      });

    axios
      .get(`http://localhost:3000/Get_CoWorkers`)
      .then((response) => {
        setCoworkers(response.data.rows);
      })
      .catch((error) => {
        console.error("Error fetching coworkers:", error);
      });

    axios
      .get(`http://localhost:3000/Get_Workspace/${workspace_id}`)
      .then((response) => {
        const workspaceName = response.data.rows[0].name;
        setWorkspaceName(workspaceName);
      })
      .catch((error) => {
        console.error("Error fetching workspace name:", error);
      });
  };

  const addCoworkerPopup = () => {
    setAddPopup(true);
  };

  const closeCoworkerPopup = () => {
    setAddPopup(false);
  };

  const createGroup = () => {
    setCreateGroupPG(true);
  };

  const closeGroup = () => {
    setCreateGroupPG(false);
  };

  const addmembers = () => {
    setAddmember(true);
  };

  const closeAdd = () => {
    setAddmember(false);
  };

  const handleChannelClick = (channel) => {
    setSelectedChannel(channel);
    setSelectedDirectMessage(null);
    setShowAddButton(true);
    localStorage.setItem("ChannelID", channel.id);
  };

  const handleDirectMessageClick = (directMessage) => {
    setSelectedChannel(null);
    setSelectedDirectMessage(directMessage);
    setCoworkerID(directMessage);
console.log("selected USer", corworkerID)
    setShowAddButton(false);
  };

  const handleRemoveDirectMessage = (coworkerId) => {
    axios
      .delete(`http://localhost:3000/Remove_Coworker/${coworkerId}`)
      .then((response) => {
        console.log("Direct message coworker removed successfully");
        fetchData();
      })
      .catch((error) => {
        console.error("Error removing direct message coworker:", error);
      });
  };

  const handleCreateGroup = (newGroupData) => {
    axios
      .post("http://localhost:3000/Create_Group", newGroupData)
      .then((response) => {
        console.log("Group created successfully");
        fetchData(); // Fetch updated data after creation
      })
      .catch((error) => {
        console.error("Error creating group:", error);
      });
  };

  const handleSendMessage = () => {
    const messageData = {
      sender: adminuser,
      receiver: corworkerID.id,
      message: inputMessage,
    };
  
    // Check if socket is available
    if (socket) {
      socket.emit("send-msg", {
        to: corworkerID.id,
        from: parseInt(adminuser),
        msg: inputMessage,
      });
  
      // Add the sent message to the state
      setMessages((prevMessages) => [...prevMessages, messageData]);
  
      setInputMessage(""); // Clear the input message field after sending
    } else {
      console.log("Socket connection not available");
    }
  };
  

  const messageshandle = (e) => {
    setInputMessage(e.target.value);
  };
  const [arrivalMessage, setArrivalMessage] = useState(null);

  useEffect(() => {
    console.log("socket is check : ", socket)
    if (socket) {
      socket.on("msg-recieve", (msg) => {
        console.log(msg);
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, [socket]);
  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  return (
    <>
     <style>
        {`/* Add these CSS styles to your existing stylesheets or create a new CSS file */
.chat-section {
  /* Existing styles for the chat section */
}
* {
 margin: 0;
 padding: 0;
 box-sizing: border-box;
}

.chatpage {
 display: flex;
}

.left-section {
 width: 10%;
 height: 100vh;
 background-color: #1F6A9B;
 display: flex;
 flex-direction: column;
 justify-content: space-between;
 align-items: center;
 padding: 20px;
 color: white;
}

.workspace {
 font-weight: bold;
 font-size: 16px;
 margin-bottom: 50px;
}

/* Boxes and logout button in the left section */
.box {
 text-align: center;
 width: 80%;
 height: 100px;
 background-color: #edf2f4;
 margin-bottom: 20px;
 padding: 20px;
}
.box a img {
 padding-top: 2px;
 height: 25px;
 width: 25px;
}
.left-section button {
 border: none;
}

.add-user img {
 width: 25px;
 height: 25px;
 cursor: pointer;
}



.logout-button {
 align-self: flex-end;
 margin-right: 50px;
}
.logout-button img {
 width: 30px;
 height: 30px;
 cursor: pointer;
}

/* Middle section with 25% width */
.middle-section {
 width: 25%;
 height: 100vh;
 background-color: #f2f2f2;
 padding: 20px;
 border: 1px solid #2b2d42;
 display: flex;
 flex-direction: column;
}

/* Right section with 65% width */
.right-section {
 width: 65%;
 height: 100vh;
 background-color: #edf2f4;
 display: flex;
 flex-direction: column;
}

.chat-section {
 height: 100%;
 display: flex;
 flex-direction: column;
}

.navbar {
 display: flex;
 align-items: center;
 padding: 10px;
 background-color: #2980B9;
 color: white;
}

.username {
 font-weight: bold;
 margin-right: auto;
 color: white;
}


.settings-button img {
 width: 22px;
 background-color: none;
 border: none;
 outline: none;
 cursor: pointer;
 font-size: 20px;
}

.messages {
 flex-grow: 1;
 overflow-y: scroll;
 padding: 10px;
 background-color: #f9f9f9;
}

.message-input {
 display: flex;
 align-items: center;
 padding: 10px;
 background-color: #edf2f4;
}

.message-input input[type="text"] {
 flex-grow: 1;
 padding: 5px;
}

.send-button img {
 width: 25px;
 padding-top: 2px;
 font-size: 22px;
 outline: none;
 cursor: pointer;
}

.action-bar {
 display: flex;
 justify-content: center;
 align-items: center;
 padding: 7px;
 background-color: #edf2f4;
}

.action-bar {
 display: flex;
}
.icon a img {
 width: 25px;
 height: 25px;
 margin-left: 20px;
}

.middle-section {
 background-color: #edf2f4;
}

.channels {
 display: flex;
 align-items: center;
 margin-bottom: 20px;
}
.username1 {
 font-size: 24px;
}

.username {
 color: white;
 font-size: 18px;
}

.dropdown-btn {
 padding: 5px 10px;
 font-size: 18px;
 border: none;
 background: none;
 cursor: pointer;
 margin-right: 5px;
 transition: transform 0.3s ease;
}

.channels-text {
 font-size: 18px;
 font-weight: bold;
}




.channels-open .channel-list {
 max-height: 100px; /* Adjust the value based on your needs */
}

.add-btn {
 font-size: 24px;
 padding: 5px 10px;
 border: none;
 background: none;
 cursor: pointer;
}

.channel-list {
            max-height: 200px;
            overflow-y: auto;
          }

          .coworker-list {
            max-height: 200px;
            overflow-y: auto;
            cursor: pointer;
          }

          .channel-list li,
          .coworker-list li {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 5px;
            cursor: pointer;
          }

          .channel-list li.selected,
          .coworker-list li.selected {
            background-color: #3498db;
            color: #fff;
          }

          .add-member-button {
            margin-left: 10px;
            padding: 5px;
            background-color: #edf2f4;
            color: '#fff';
            font-size: 20px;
            cursor: pointer;
          }

          .group-member-action {
            margin-left: auto;
            cursor: pointer;
            color: #3498db;
            font-size: 14px;
          }
          .message-item {
  margin-bottom: 10px;
}

.message-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.message {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 10px;
}

.message.received .content {
  background-color: #f0f0f0;
  border-radius: 10px;
  padding: 10px;
  max-width: 80%;
}

.message.sent .content {
  background-color: #d4edda;
  border-radius: 10px;
  padding: 10px;
  max-width: 80%;
  margin-left: auto;
}

.message .content p {
  margin: 0;
}

.chat-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.message-input {
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: #f7f7f7;
}

.message-input input {
  flex: 1;
  border: none;
  padding: 8px;
  border-radius: 5px;
  margin-right: 10px;
}

.message-input button {
  border: none;
  background-color: #007bff;
  color: #fff;
  padding: 8px 15px;
  border-radius: 5px;
  cursor: pointer;
}

.action-bar {
  display: flex;
  justify-content: flex-end;
  padding: 10px;
  background-color: #f7f7f7;
}

.action-bar .icon {
  margin-right: 10px;
}

.action-bar .icon img {
  width: 20px;
  height: 20px;
}

.channel-list {
  list-style-type: none;
  padding: 0;
}

.channel-item {
  display: flex;
  align-items: center;
}

.channel-names {
  display: flex;
  align-items: center;
}

.channel-image {
  width: 20px; /* adjust the width as needed */
  height: 20px; /* adjust the height as needed */
  margin-right: 10px; /* adjust the spacing between the image and the channel name */
}

.coworker-list {
  list-style-type: none;
  padding: 0;
}

.coworker-item {
  display: flex;
  align-items: center;
}

.coworker-names {
  display: flex;
  align-items: center;
}

.coworker-image {
  width: 20px; /* adjust the width as needed */
  height: 20px; /* adjust the height as needed */
  margin-right: 10px; /* adjust the spacing between the image and the channel name */
}

.nav__logo {
  height: 4.5rem;
  transition: all 0.3s;
}

`}
      </style>
      <div className="chatpage">
        <div className="left-section">
          <img src={img9} alt="Facile" className="nav__logo" id="logo" />
          <div className="workspace">WorkSpace{workspaceName}</div>
          {adminuser === null ? (
            <></>
          ) : (
            <div className="add-user">
                <img onClick={addCoworkerPopup} src={img1} alt="" />

              {addCoworker && (
                <div className="popup-container">
                  <div className="popup">
                    <AddCoworker onClose={closeCoworkerPopup} />
                  </div>
                </div>
              )}
            </div>
          )}
          <div className= "logout-button">
              <img src={img2} alt="" />
          </div>
        </div>

        <div className="middle-section">
          <div className="channels">
            <span className="channels-text">Channels</span>
            <span>
              <button className="add-btn" onClick={createGroup}>
                +
              </button>
              {createGroupPG && (
                <div className="popup-container">
                  <div className="popup">
                    <CreateChannel onClose={closeGroup} onCreateGroup={handleCreateGroup} />
                  </div>
                </div>
              )}
            </span>
          </div>
          <ul className="channel-list">
  {channels.map((channel) => (
    <li
      key={channel.id}
      onClick={() => handleChannelClick(channel)}
      className={`channel-item ${selectedChannel === channel ? "selected" : ""}`}
    >
      <div className="channel-names">
        <img className="channel-image" src={img3} alt="" />
        <span>{channel.name}</span>
      </div>
    </li>
  ))}
</ul>

          <br />
          <hr />
          <br />
          <div className="direct-messages">
            <span className="channels-text">Direct Messages</span>
            <span>
              <button className="add-btn">+</button>
            </span>
          </div>
          <ul className="coworker-list">
            {coworkers.map((coworker) => (
              <li
                key={coworker.id}
                onClick={() => handleDirectMessageClick(coworker)}
                className={selectedDirectMessage === coworker ? "selected" : ""}
              ><div>
                 <img className="coworker-image" src={img5} alt="" />
                 <span>{coworker.name}</span>
              </div>
                {adminuser !== null && (
                  <div
                    className="group-member-action"
                    onClick={() => handleRemoveDirectMessage(coworker.id)}
                  >
                    Remove
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="right-section">
          <div className="chat-section">
            <div className="navbar">
              <div className="username">
                {selectedChannel
                  ? selectedChannel.name
                  : selectedDirectMessage
                  ? selectedDirectMessage.name
                  : "John Doe"}
                {showAddButton && (
                  <button className="add-member-button" onClick={addmembers}>
                    +
                  </button>
                )}
                {Addmember && (
                  <div className="popup-container">
                    <div className="popup">
                      <GroupMember onClose={closeAdd} />
                    </div>
                  </div>
                )}
              </div>
              <a href="" className="settings-button">
                <img src={img4} alt="" />
              </a>
            </div>

            <div className="chat-section">
            <div className="chat-body">
  <ul className="message-list">
  {messages.map((message) => {
  return (
    <div ref={scrollRef} key={uuidv4()}>
      <div
        className={`message ${message.fromSelf ? "sent" : "received"}`}
      >
        <div className="content">
        
          <p>{message.message}</p>
        </div>
      </div>
    </div>
  );
})}

  </ul>
</div>

            </div>
            <div className="message-input">
              <input
                type="text"
                placeholder="Type your message..."
                value={inputMessage}
                onChange={messageshandle}
              />
              <button onClick={handleSendMessage}>
             send
              </button>
            </div>
            <div className="action-bar">
              <div className="icon">
                <a href="">
                  <img src={img8} alt="" />
                </a>
              </div>
              <div className="icon">
                <a href="">
                  <img src={img7} alt="" />
                </a>
              </div>
              <div className="icon">
                <a href="">
                  <img src={img6} alt="" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Chatpage;

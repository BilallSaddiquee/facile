import React, { useEffect, useState } from 'react';
import axios from 'axios';
import img1 from "../images/add-user.png";
import img2 from "../images/turn-off.png";
import img3 from "../images/plus.png";
import img4 from "../images/settings.png";
import img5 from "../images/send.png";
import img6 from "../images/zoom.png";
import img7 from "../images/microphone.png";
import img8 from "../images/attachment.png";
import img9 from "../images/search.png";
import AddCoworker from './AddCoworker';
import CreateChannel from './CreateChannel';

function Chatpage({ onClose }) {
  const [addCoworker, setAddPopup] = useState(false);
  const [createGroupPG, setCreateGroupPG] = useState(false);
  const [channels, setChannels] = useState([]);
  const [coworkers, setCoworkers] = useState([]);
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [selectedDirectMessage, setSelectedDirectMessage] = useState(null);

  useEffect(() => {
    // Fetch channels data from the database using Axios
    axios.get('http://localhost:3000/Get_Channels')
      .then(response => {
        setChannels(response.data.rows);
      })
      .catch(error => {
        console.error('Error fetching channels:', error);
      });

    // Fetch coworkers data from the database using Axios
    axios.get('http://localhost:3000/Get_CoWorkers')
      .then(response => {
        setCoworkers(response.data.rows);
      })
      .catch(error => {
        console.error('Error fetching coworkers:', error);
      });
  }, []);

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

  const handleChannelClick = (channel) => {
    setSelectedChannel(channel);
    setSelectedDirectMessage(null);
  };

  const handleDirectMessageClick = (directMessage) => {
    setSelectedChannel(null);
    setSelectedDirectMessage(directMessage);
  };

  return (
    <>
<style>
  {`
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
      background-color: #2b2d42;
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
      margin-bottom: 20px;
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
    
    .adduser img {
      width: 25px;
      height: 25px;
      cursor: pointer;
    }
    
    .logout-button {
      align-self: flex-end;
      margin-top: auto;
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
      background-color: #2b2d42;
      color: white;
    }
    
    .username {
      font-weight: bold;
      margin-right: auto;
      color: white;
    }
    
    .search-bar {
      display: flex;
      align-items: center;
      margin-right: 10px;
    }
    .search-button img {
      width: 25px;
      padding-top: 2px;
      font-size: 22px;
      outline: none;
      cursor: pointer;
    }
    
    .search-bar input[type="text"] {
      padding: 5px;
    }
    
    .search-button {
      background-color: #f3f0f0;
      border: none;
      outline: none;
      cursor: pointer;
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
    
    .channel-list {
      list-style-type: none;
      padding: 0;
      margin: 10px 0;
      transition: max-height 0.3s ease, opacity 0.3s ease;
    }
    
    .channel-list li {
      padding: 5px;
      cursor: pointer;
    }
    .channels-open .channel-list {
      max-height: 200px; /* Adjust the value based on your needs */
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
    }
    
    .channel-list li,
    .coworker-list li {
      padding: 5px;
      cursor: pointer;
    }
    
    .channel-list li.selected,
    .coworker-list li.selected {
      background-color: #3498db;
      color: #fff;
    }
  `}
</style>


      <div className="chatpage">
        <div className="left-section">
          <div className="workspace">Workspace</div>
          <div className="box" style={{ backgroundColor: "black" }}></div>
          <div className="adduser">
            <button className="adduser-button" onClick={addCoworkerPopup}>
              <img src={img1} alt="adduser" />
            </button>
            {addCoworker && (
              <div className="popup-container">
                <div className="popup">
                  <AddCoworker onClose={closeCoworkerPopup} />
                </div>
              </div>
            )}
          </div>
          <div>
            <button className="logout-button">
              <img src={img2} alt="" />
            </button>
          </div>
        </div>

        <div className="middle-section">
          <div className='username1'><strong>{selectedChannel ? selectedChannel.name : selectedDirectMessage ? selectedDirectMessage.name : 'Username'}</strong></div>
          <br />
          <hr />
          <br />
          <div className="channels">
            <span className="channels-text">Channels</span>
            <span>
              <button className="add-btn" onClick={createGroup}>+</button>
              {createGroupPG && (
                <div className="popup-container">
                  <div className="popup">
                    <CreateChannel onClose={closeGroup} />
                  </div>
                </div>
              )}
            </span>
          </div>
          <ul className="channel-list">
            {channels.map(channel => (
              <li
                key={channel.id}
                onClick={() => handleChannelClick(channel)}
                className={selectedChannel === channel ? 'selected' : ''}
              >
                {channel.name}
              </li>
            ))}
          </ul>

          <div className="direct-messages">
            <span className="channels-text">Direct Messages</span>
            <span>
              <button className="add-btn">+</button>
            </span>
          </div>
          <ul className="coworker-list">
            {coworkers.map(coworker => (
              <li
                key={coworker.id}
                onClick={() => handleDirectMessageClick(coworker)}
                className={selectedDirectMessage === coworker ? 'selected' : ''}
              >
                {coworker.name}
              </li>
            ))}
          </ul>
        </div>

        <div className="right-section">
          <div className="chat-section">
            <div className="navbar">
              <div className="username">{selectedChannel ? selectedChannel.name : selectedDirectMessage ? selectedDirectMessage.name : 'John Doe'}</div>
              <div className="search-bar">
                <input type="text" placeholder="Search..." />
                <div className='search'>
                  <button className="search-button"><img src={img9} alt="" /></button>
                </div>
              </div>
              <a href='' className='settings-button'><img src={img4} alt="" /></a>
            </div>
            <div className="messages">
              {/* Chat messages go here */}
            </div>
            <div className="message-input">
              <input type="text" placeholder="Type your message..." />
              <a href="" className='send-button'><img src={img5} alt="" /></a>
            </div>
            <div className="action-bar">
              <div className='icon'><a href=''><img src={img8} alt='' /></a></div>
              <div className='icon'><a href=''><img src={img7} alt='' /></a></div>
              <div className='icon'><a href=''><img src={img6} alt='' /></a></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Chatpage;

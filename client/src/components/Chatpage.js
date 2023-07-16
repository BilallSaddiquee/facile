import React, { useEffect, useState } from 'react';
import axios from 'axios';
import img1 from "../images/add-user.png";
import img2 from "../images/switch.png";
import img3 from "../images/plus.png";
import img4 from "../images/settings.png";
import img5 from "../images/send.png";
import img6 from "../images/zoom.png";
import img7 from "../images/microphone.png";
import img8 from "../images/shared-folder.png";
import img9 from "../images/search.png";
import img10 from "../images/meeting.png";
import img11 from "../images/man.png";
import img12 from "../images/add-message.png";

import AddCoworker from './AddCoworker';
import CreateChannel from './CreateChannel';
import GroupMember from './GroupMember';

function Chatpage({ onClose }) {
  const [addCoworker, setAddPopup] = useState(false);
  const [createGroupPG, setCreateGroupPG] = useState(false);
  const [Addmember, setAddmember] = useState(false);
  const [channels, setChannels] = useState([]);
  const [coworkers, setCoworkers] = useState([]);
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [selectedDirectMessage, setSelectedDirectMessage] = useState(null);
  const [showAddButton, setShowAddButton] = useState(false);
  const [workspaceName, setWorkspaceName] = useState('');
  const workspace_id = localStorage.getItem("workIDss");
  const adminuser = localStorage.getItem('email_token');

  useEffect(() => {
    fetchData();
  }, [workspace_id]);

  const fetchData = () => {
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

    // Fetch workspace name from the database based on the workspace ID
    axios.get(`http://localhost:3000/Get_Workspace/${workspace_id}`)
      .then(response => {
        const workspaceName = response.data.rows[0].name;
        setWorkspaceName(workspaceName);
      })
      .catch(error => {
        console.error('Error fetching workspace name:', error);
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
    setShowAddButton(false);
  };

  const handleRemoveDirectMessage = (coworkerId) => {
    axios.delete(`http://localhost:3000/Remove_Coworker/${coworkerId}`)
      .then(response => {
        console.log('Direct message coworker removed successfully');
        fetchData(); // Fetch updated data after removal
      })
      .catch(error => {
        console.error('Error removing direct message coworker:', error);
      });
  };

  const handleCreateGroup = (newGroupData) => {
    axios.post('http://localhost:3000/Create_Group', newGroupData)
      .then(response => {
        console.log('Group created successfully');
        fetchData(); // Fetch updated data after creation
      })
      .catch(error => {
        console.error('Error creating group:', error);
      });
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
                width: 7%;
                height: 100vh;
                background-color: #0047AB;
                display: flex;
                flex-direction: column;
                /* justify-content: space-between; */
                text-align: center;
                padding: 10px;
                color:white;
            }

            .workspace{
                margin-top: 10px;
                font-weight: bold;
                font-size: 20px;
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

            .adduser img{
                width: 45px;
                height: 45px;
                color: #fff;
                cursor:pointer;
            }

            .logout-button{
                justify-content: flex-end;
                margin-top: 40rem;
            }
            .logout-button img{
                width: 50px;
                height: 50px;
                cursor: pointer;
            }

          .profile img{
                width: 75px;
                height: 70px;
                margin: 20px;
                cursor:pointer;
            }


            .man {
                display: flex;
                align-items: center;
            }
            .username1{
               margin: 15px;
            }

            .man img{
                margin-left: auto;
                width: 50px;
                height: 50px;
                cursor:pointer;
            }



/* Middle section with 25% width */
.middle-section {
 width: 30%;
 height: 100vh;
 background-color: #f2f2f2;
 padding: 20px;
 border: 1px solid #2b2d42;
 display: flex;
 flex-direction: column;
}

/* Right section with 65% width */
.right-section {
 width: 80%;
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
                background-color: #F08F3E;
                color:white;
              } 

            .navbar .username {
                font-weight: bold;
                font-size: 30px;
                margin-right: auto;
                color: #ffff;
              }

              .search-bar {
                display: flex;
                align-items: center;
                margin-right: 10px;
              }
              .search-button img{
                width: 25px;
                paddingTop: 2px;
                // background-color: #2980B9;
                font-size: 22px;
                // border: none;
                outline: none;
                cursor: pointer;

              }
              
              .search-bar input[type="text"] {
                padding: 5px;
              }
              
              .search-button {
                margin: 10px;
                // padding: 6px;
                background-color: #f3f0f0;
                border: none;
                outline: none;
                cursor: pointer;
              }

              .plus-button img{
                // padding: 7px;
                width: 30px;
                height: 30px;
                background-color: none;
                background: none;
                border: none;
                outline: none;
                cursor: pointer;
                font-size: 25px;
              }

.settings-button img{
                // padding: 7px;
                width: 30px;
                height: 30px;
                background-color: none;
                background: none;
                border: none;
                outline: none;
                cursor: pointer;
                font-size: 25px;
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
                backgroundColor: #20980B9;
              }
              
              .message-input input[type="text"] {
                flex-grow: 1;
                padding: 5px;
              }
              
              .send-button img{
                width: 25px;
                paddingTop: 2px;
                // background-color: #2980B9;
                font-size: 22px;
                // border: none;
                outline: none;
                cursor: pointer;
              }
              
              .action-bar {
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 7px;
                background-color: #f2f2f2;
              }
              
              .action-bar{
                display:flex;
              }          
              .icon a img{
                width:25px;
                height:25px;
                margin-left:30px;
              }

              .middle-section{
                background-color:#ffffff;
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
   `}
 </style>
      <div className="chatpage">
        <div className="left-section">
          <div className="workspace">{workspaceName}</div>
          <div className= "profile"><a><img src={img10} alt="" /></a></div>
          {adminuser === null ? (
            <></>
          ) : (
            <div className="adduser">
              <div className="adduser" onClick={addCoworkerPopup}>
                <a href=''><img src={img1} alt="adduser" /></a>
              </div>
              {addCoworker && (
                <div className="popup-container">
                  <div className="popup">
                    <AddCoworker onClose={closeCoworkerPopup} />
                  </div>
                </div>
              )}
            </div>
          )}
          <div>
            <div className="logout-button">
              <a href=''><img src={img2} alt="" /></a>
            </div>
          </div>
        </div>

        <div className="middle-section">
          <div className="man">
              <a href=""><img src={img11} alt="man" /></a>
                  <div className="username1"><strong>John Doe</strong></div>
                  <div className="add-message">
                       <a href=""><img src={img12} alt="add-message" /></a>
                  </div>
                  </div>

                    <br />
                    <hr />
                    <br />
          <div className="channels">
            <span className="channels-text">Channels</span>
            <span>
              <button className="add-btn" onClick={createGroup}><a href='' className='plus-button'><img src={img3} alt="" /></a></button>
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
          <br />
          <hr />
          <br />
          <div className="direct-messages">
            <span className="channels-text">Direct Messages</span>
            <span>
              <button className="add-btn"><a href='' className='plus-button'><img src={img3} alt="" /></a></button>
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
                {adminuser !== null && (
                  <div className="group-member-action" onClick={() => handleRemoveDirectMessage(coworker.id)}>
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
                {selectedChannel ? selectedChannel.name : selectedDirectMessage ? selectedDirectMessage.name : 'John Doe'}
                {showAddButton && (
                  <button className="add-member-button" onClick={addmembers}><a href='' className='plus-button'><img src={img3} alt="" /></a></button>
                )}
                {Addmember && (
                  <div className="popup-container">
                    <div className="popup">
                      <GroupMember onClose={closeAdd} />
                    </div>
                  </div>
                )}
              </div >
              <div className='search'>
                 <button className="search-button"><img src={img9} alt="" /></button>
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
              <div className="icon"><a href=""><img src={img8} alt="" /></a></div>
              <div className="icon"><a href=""><img src={img7} alt="" /></a></div>
              <div className="icon"><a href=""><img src={img6} alt="" /></a></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Chatpage;

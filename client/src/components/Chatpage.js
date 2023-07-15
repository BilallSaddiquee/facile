import React, { useEffect, useState } from 'react'
import img1 from "../images/add-user.png";
import img2 from "../images/turn-off.png";
import img3 from "../images/plus.png";
import img4 from "../images/settings.png";
import img5 from "../images/send.png";
import img6 from "../images/zoom.png";
import img7 from "../images/microphone.png";
import img8 from "../images/attachment.png";
import img9 from "../images/search.png";



function Chatpage() {

    const [channelsOpen, setChannelsOpen] = useState(false);
    const [directMessagesOpen, setDirectMessagesOpen] = useState(false);

    const toggleChannels = () => {
        setChannelsOpen(!channelsOpen);
    };

    const toggleDirectMessages = () => {
        setDirectMessagesOpen(!directMessagesOpen);
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
                background-color: #4d394b;
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
                font-size: 14px;
                margin-bottom: 20px;
            }
            
            /* Boxes and logout button in the left section */
            .box {
                text-align: center;
                width: 80%;
                margin-left: 10px;
                height: 100px;
                background-color: #ccc6c6;
                margin-bottom: 20px;
                padding: 20px;
            }
            .box a img{
                padding-top: 2px;
                text-align: center;
                height: 25px;
                width: 25px;
            }
            .left-section button{
                border: none;
            }
            .plus img{
                width: 10px;
                height: 10px;
            }
            
            /* .logout-button {
                /* padding: 7px; */
                /* background-color: rgb(240, 239, 239); 
            } */
            
            .adduser img{
                width: 25px;
                height: 25px;
                cursor:pointer;
            }
            
            
            .logout-button{
                justify-content: flex-end;
                margin-top: 27rem;
            }
            .logout-button img{
                width: 30px;
                height: 30px;
                cursor: pointer;
            }
            
            /* Middle section with 25% width */
            .middle-section {
                width: 23%;
                height: 100vh;
                background-color: #f2f2f2;
                padding: 10px;
                border: 1px solid black;
                display: flex;
                flex-direction: column;
            }
            
            /* Right section with 70% width */
            .right-section {
                width: 70%;
                height: 100vh;
                background-color: rgba(255,255,255,255);
                /* padding: 10px; */
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
                background-color: rgba(77,57,75,255);
                color:white;
              }
              
              .username {
                font-weight: bold;
                margin-right: auto;
                color:white;
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
                // padding: 6px;
                background-color: #f3f0f0;
                border: none;
                outline: none;
                cursor: pointer;
              }
              
              .settings-button img{
                // padding: 7px;
                width: 22px;
                background-color: none;
                background: none;
                border: none;
                outline: none;
                cursor: pointer;
                font-size:20px;
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
                margin-bottom: 10px;
              }
              .username1{
                font-size:30px;
              }

              .username{
                color:white;
                font-size:20px;
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
              }
              .channels-open .channel-list{
                max-height: 200px; /* Adjust the value based on your needs */
              }
              
              .add-btn {
                font-size: 24px;
                padding: 5px 10px;
                border: none;
                background: none;
                cursor: pointer;
              }
        `}
            </style>
            <div className="chatpage">
                <div className="left-section">
                    <div className="workspace">Workspace</div>
                    <div className="box" style={{ backgroundColor: "black" }}><a href=""></a></div>
                    <div className="adduser">
                        <a href=''><img src={img1} alt="adduser" /></a>
                    </div>
                    <div>
                        <button className='logout-button'><img src={img2} alt="" /></button>
                    </div>
                </div>

                <div className="middle-section">
                    <div className='username1'><strong>Username</strong></div>
                    <br />
                    <hr />
                    <br />
                    <div className="channels">
                        <button className="dropdown-btn" onClick={toggleChannels}>
                            {channelsOpen ? <>&#9660;</> : <>&#9654;</>}
                        </button>
                        <span className="channels-text">Channels</span><spam><button className="add-btn">+</button></spam>
                    </div>
                    {channelsOpen && (
                        <ul className="channel-list">
                            {/* List of channels */}
                            <li>Channel 1</li>
                            <li>Channel 2</li>
                            <li>Channel 3</li>
                        </ul>
                    )}

                    {/* Direct Messages */}
                    <div className={`direct-messages ${directMessagesOpen ? 'open' : ''}`}>
                        <button className="dropdown-btn" onClick={toggleDirectMessages}>
                            {directMessagesOpen ? <>&#9660;</> : <>&#9654;</>}
                        </button>
                        <span className="channels-text">Direct Messages</span><span><button className="add-btn">+</button></span>
                    </div>
                    {directMessagesOpen && (
                        <ul className="channel-list">
                            {/* List of direct messages */}
                            <li>Direct Message 1</li>
                            <li>Direct Message 2</li>
                            <li>Direct Message 3</li>
                        </ul>
                    )}

                    




                </div>



                <div className="right-section">
                    <div className="chat-section">
                        <div className="navbar">
                            <div className="username">John Doe</div>
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
            </div >
        </>
    );
}


export default Chatpage;
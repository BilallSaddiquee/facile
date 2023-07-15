import React, { useEffect, useState } from 'react';
import axios from 'axios';

function GroupMemberPopup({ onClose }) {
  const [searchText, setSearchText] = useState('');
  const channelID = localStorage.getItem("ChannelID");
  const [groupMembers, setGroupMembers] = useState([]);
  const [remainingMembers, setRemainingMembers] = useState([]);

  useEffect(() => {
    // Fetch group members based on the channel ID using Axios
    axios.get(`http://localhost:3000/Get_GroupMembers/${channelID}`)
      .then(response => {
        setGroupMembers(response.data.rows);
      })
      .catch(error => {
        console.error('Error fetching group members:', error);
      });

    // Fetch remaining coworkers using Axios
    axios.get('http://localhost:3000/Get_CoWorkers')
      .then(response => {
        setRemainingMembers(response.data.rows);
      })
      .catch(error => {
        console.error('Error fetching coworkers:', error);
      });
  }, [channelID]);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleRemoveMember = (member) => {
    setGroupMembers(prevMembers => prevMembers.filter(m => m.id !== member.id));
    setRemainingMembers(prevMembers => [...prevMembers, member]);
  };

  const handleAddMember = (member) => {
    setGroupMembers(prevMembers => [...prevMembers, member]);
    setRemainingMembers(prevMembers => prevMembers.filter(m => m.id !== member.id));
  };

  const filteredMembers = [...groupMembers, ...remainingMembers].filter((member, index, self) =>
    index === self.findIndex(m => m.name === member.name)
  ).filter(member =>
    member.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <>
      <style>
        {`
          .group-member-popup {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: rgba(0, 0, 0, 0.5);
          }

          .group-member-container {
            width: 400px;
            background-color: #fff;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
          }

          .group-member-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 10px;
          }

          .group-member-title {
            font-size: 20px;
            font-weight: bold;
            color: #777;
          }

          .group-member-close {
            cursor: pointer;
            color: #777;
          }

          .group-member-search input {
            width: 100%;
            padding: 8px;
            border: 1px solid #ddd;
            border-radius: 3px;
            font-size: 14px;
          }

          .group-member-list {
            max-height: 200px;
            overflow-y: auto;
            margin-top:30px;
           
          }

          .group-member-item {
            display: flex;
            align-items: center;
            margin-bottom: 10px;
          }

          .group-member-name {
            font-size: 16px;
            font-weight: bold;
            margin-left: 10px;
            color: #777;
          }

          .group-member-action {
            margin-left: auto;
            cursor: pointer;
            color: #3498db;
            font-size: 14px;
          }

          .group-member-button {
            width: 100%;
            padding: 10px;
            margin-top: 10px;
            border: none;
            border-radius: 3px;
            background-color: #3498db;
            color: #fff;
            cursor: pointer;
            font-weight: bold;
          }
        `}
      </style>

      <div className="group-member-popup">
        <div className="group-member-container">
          <div className="group-member-header">
            <div className="group-member-title">Manage Members</div>
            <div className="group-member-close" onClick={onClose}>
              Close
            </div>
          </div>
          <div className="group-member-search">
            <input
              type="text"
              placeholder="Search members..."
              value={searchText}
              onChange={handleSearchChange}
            />
          </div>
          <div className="group-member-list">
            {filteredMembers.map(member => (
              <div className="group-member-item" key={member.id}>
                <div className="group-member-name">{member.name}</div>
                {groupMembers.some(groupMember => groupMember.id === member.id) ? (
                  <div
                    className="group-member-action"
                    onClick={() => handleRemoveMember(member)}
                  >
                    Remove
                  </div>
                ) : (
                  <div
                    className="group-member-action"
                    onClick={() => handleAddMember(member)}
                  >
                    Add
                  </div>
                )}
              </div>
            ))}
          </div>
          <button className="group-member-button" onClick={onClose}>
            Done
          </button>
        </div>
      </div>
    </>
  );
}

export default GroupMemberPopup;

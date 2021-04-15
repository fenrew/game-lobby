import React from 'react';
import "./display-room-options.css"

const DisplayRoomOptions = (props) => {
    const handleLeaveRoom = () => {
        props.socket.emit("leaveRoom")
        props.handleDisplay("displayAllLobbies")
    }

    return (
        <div id="display-room-options-container">
            <div className="lobby-default-btn" id="display-room-options-btn" onClick={() => handleLeaveRoom()}>Leave room</div>
        </div>
    );
};

export default DisplayRoomOptions;
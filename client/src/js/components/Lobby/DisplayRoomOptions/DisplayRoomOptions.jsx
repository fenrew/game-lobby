import React from 'react';
import "./display-room-options.css"

const DisplayRoomOptions = (props) => {
    return (
        <div id="display-room-options-container">
            <div className="lobby-default-btn" id="display-room-options-btn" onClick={() => props.handleDisplay("displayAllLobbies")}>Leave room</div>
        </div>
    );
};

export default DisplayRoomOptions;
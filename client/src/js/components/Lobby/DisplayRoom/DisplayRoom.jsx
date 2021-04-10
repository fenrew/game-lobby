import React from 'react';

import "./display-room.css";

const DisplayRoom = (props) => {
    const {id, name: roomName, players, maxPlayers, age, closed} = props.room

    return (
        <div id="display-room-main-container">
            <h1>{roomName}</h1>
            
        </div>
    );
};

export default DisplayRoom;
import React from 'react';

import "./display-room.css";

const DisplayRoom = (props) => {
    const {id, roomName, players, maxPlayers, age, closed, gameUrl} = props.room
    console.log(props)

    return (
        <div id="display-room-main-container">
            <h1>Room: {roomName}</h1>
            <div>
                <div>Players:</div>
                <div>{players}</div>
            </div>
            <div>Start</div>
        </div>
    );
};

export default DisplayRoom;
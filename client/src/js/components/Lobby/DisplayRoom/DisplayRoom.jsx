import React, { useEffect } from 'react';

import "./display-room.css";

const DisplayRoom = (props) => {
    const {id, roomName, players, maxPlayers, age, closed, gameUrl} = props.room

    useEffect(() => {
        props.socket.on("updatedRooms", (updatedRoom) => {
            if(updatedRoom.id === id){
                console.log("UPDATED ROOM", updatedRoom)
                props.handleDisplay("displayRoom", updatedRoom)
            }
        })

        return () => {
            props.socket.off("updatedRooms")
        }
    }, [])

    console.log(players)
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
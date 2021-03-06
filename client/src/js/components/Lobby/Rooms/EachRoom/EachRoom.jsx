import React, { useEffect, useState } from 'react';

import "./each-room.css"

const EachRoom = (props) => {
    const {id, roomName, players, maxPlayers, age, closed} = props.room

    console.log("ROOM", players)

    const [action, setAction] = useState({
        hover: false
    })

    useEffect(() => {
        props.socket.on("joinedRoomSuccess", (newRoom) => {
            props.handleDisplay("displayRoom", newRoom)
        })
    }, [])

    const handleJoinRoom = () => {
        props.socket.emit("joinRoom", {roomId: id, userDisplayName: props.displayName})
    }

    const ageInMinutes = ((new Date().getTime() - new Date(age).getTime())) / 60000

    const formatAge = (ageMinutes) => {
        if(ageMinutes < 120) return Math.floor(ageMinutes) + " min"
        else if(ageMinutes < 60*24) return Math.floor(ageMinutes/60) + " hr"
        else return Math.floor(ageMinutes/(60*24)) + " days"
    }

    const backgroundColor = () => { 
        if(action.hover && closed) return "rgb(100, 30, 30)"
        else if(action.hover) return props.index%2 === 0 ? "rgb(30, 30, 30)" : "rgb(50, 50, 50)"

        if(closed) return "rgb(200, 100, 100)"
        return props.index%2 === 0 ? "rgb(140, 140, 140)" : "rgb(180, 180, 180)"
    }

    return (
        <div className="each-room-container" 
            style={{backgroundColor: backgroundColor()}} 
            onMouseEnter={() => setAction({...action, hover: true })}
            onMouseLeave={() => setAction({...action, hover: false})}
            onDoubleClick={() => handleJoinRoom()}
        >
            <p className="each-room-name">{roomName}</p>
            <p className="each-room-players">{players.length}/{maxPlayers}</p>
            <p className="each-room-age">{formatAge(ageInMinutes)}</p>
            <div className="each-room-join-container">
                    {closed ? (
                        <p className="each-room-closed">
                            Closed
                        </p>
                    ) : (
                    <p className="each-room-join" onClick={() => handleJoinRoom()}>
                        Join                        
                    </p>
                    )}
            </div>
        </div>
    );
};

export default EachRoom;
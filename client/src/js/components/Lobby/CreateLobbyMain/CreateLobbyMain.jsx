import React, { useEffect, useState } from 'react';
import "./create-lobby-main.css"

const CreateLobbyMain = (props) => {
    const [newLobby, setNewLobby] = useState({
        roomName: "",
        maxPlayers: 8,
        gameUrl: "",
        creating: false
    })
    
    const [redirect, setRedirect] = useState({
        toRoom: false
    })

    useEffect(() => {
        if(redirect.toRoom) {
            console.log("REDIRECT TO ROOM", redirect.toRoom)
            props.handleDisplay("displayRoom", redirect.toRoom)
        }
    })

    useEffect(() => {
        props.socket.on("createdRoomSuccess", (newRoom) => {
            setRedirect({toRoom: newRoom})
        })

        return () => {
            props.socket.off('createdRoomSuccess');
        }
    }, [])

    const handleChange = (e) => {
        setNewLobby({
            ...newLobby, [e.target.name]: e.target.value
        })
    }

    const handleCreateLobby = async () => {
        props.socket.emit("createRoom", {newRoom: newLobby, creator: props.displayName || "Anonymous"})
    }

    return (
        <div id="create-lobby-main-container">
            <div>
                <div>
                    <label htmlFor="roomName">Room Name</label>
                    <input type="text" name="roomName" value={newLobby.roomName} onChange={(e) => handleChange(e)}/>
                </div>
                <div>
                    <label htmlFor="gameUrl">Game Url</label>
                    <input type="text" name="gameUrl" value={newLobby.gameUrl} onChange={(e) => handleChange(e)}/>
                </div>
                <div>
                    <label htmlFor="maxPlayers">Max Players</label>
                    <input type="number" name="maxPlayers" value={newLobby.maxPlayers} onChange={(e) => handleChange(e)}/>
                </div>
            </div>
            <div className="lobby-default-btn" onClick={() => handleCreateLobby()}>Create Lobby</div>
        </div>
    );
};

export default CreateLobbyMain;
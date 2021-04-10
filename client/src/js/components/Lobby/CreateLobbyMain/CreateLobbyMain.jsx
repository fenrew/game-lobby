import React, { useState } from 'react';
import "./create-lobby-main.css"

const CreateLobbyMain = () => {
    const [newLobby, setNewLobby] = useState({
        roomName: "",
        maxPlayers: 8,
        gameUrl: ""
    })

    const handleChange = (e) => {
        console.log(e.target.name, e.target.value)
        setNewLobby({
            ...newLobby, [e.target.name]: e.target.value
        })
    }

    const handleCreateLobby = async () => {
        fetch("/api/create-lobby", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
              },
            body: JSON.stringify(newLobby)
          }).then(response => response.json())
          .then(data => {
              if(!data.created){
                return console.error("400: The room was not created due to a bad request")
              }
              else {

              }
          })
          .catch(err => {
              console.error("Something went wrong while creating a new room", err)
          })
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
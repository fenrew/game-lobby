import React, { useState, useEffect } from 'react';
import Topnavigator from "./Topnavigator/Topnavigator"
import Options from "./Options/Options"
import Rooms from "./Rooms/Rooms"
import CreateLobbyMain from "./CreateLobbyMain/CreateLobbyMain"
import CreateLobbyOptions from "./CreateLobbyOptions/CreateLobbyOptions"
import DisplayRoom from "./DisplayRoom/DisplayRoom"
import DisplayRoomOptions from "./DisplayRoomOptions/DisplayRoomOptions"
import LobbyChat from "./LobbyChat/LobbyChat"

import socketIOClient from "socket.io-client";

import "./lobby.css"

const Lobby = () => {
    const [io, setIo] = useState({
        socket: null
    })

    const [display, setDisplay] = useState({
        displayAllLobbies: true,
        createLobby: false,
        displayRoom: false
    })

    const [sortBy, setSortBy] = useState({
        name: 0,
        players: 0,
        age: 1,
        closed: 0
    })

    const [filterBy, setFilterBy] = useState({
        open: false,
        roomName: "",
        playerName: "",
        minPlayers: "", // number
        maxPlayers: "" // number
    })

    const [displayName, setDisplayName] = useState({
        value: ""
    })

    useEffect(() => {
        const socket = socketIOClient();
        socket.on("connect", () => {
            setIo({...io, socket })
            console.info("User connected to socket.io")
        });
    }, [])

    const clickSortHandler = (byType) => {
        if(!sortBy[byType]) {
            Object.keys(sortBy).forEach(key => sortBy[key] = 0)
            setSortBy({...sortBy, [byType]: 1})
            return
        } else if(sortBy[byType] === 1) {
            setSortBy({...sortBy, [byType]: -1})
            return
        } else {
            setSortBy({...sortBy, [byType]: 1})
            return
        }
    }

    const handleFiltering = (filterKey, filterValue) => {
        if(!filterValue){
            // if(typeof filterBy[filterKey] === "number") filterValue = 0
            // else if(typeof filterBy[filterKey] === "string") filterValue = ""
            if(typeof filterBy[filterKey] === "boolean") filterValue = false
        }
        setFilterBy({
            ...filterBy, [filterKey]: filterValue
        })
    }

    const clearFilter = () => {
        // Sets the filtering back to the default "" for all but booleans which is set to false 
        Object.keys(filterBy).map(el => 
            (typeof filterBy[el] === "boolean" && filterBy[el] === false) ? false : "")

        setFilterBy(filterBy)
    }

    const handleDisplay = (toDisplay, setValue) => {
        const newDisplayObj = {}
        Object.keys(display).forEach(disp => newDisplayObj[disp] = false)
        setDisplay({...newDisplayObj, [toDisplay]: setValue || true})
    }

    // Sets the screen render
    let displayRender;

    if(display.createLobby){
        // Displays create lobby interface
        displayRender = (
            <>
                <CreateLobbyOptions handleDisplay={handleDisplay} />
                <div id="lobbies-containers">
                    <CreateLobbyMain socket={io.socket} handleDisplay={handleDisplay} displayName={displayName.value} />
                </div>
            </> 
        )
    } else if(display.displayRoom){
        // Displays the specific joined lobby
        displayRender = (
            <>
                <DisplayRoomOptions socket={io.socket} handleDisplay={handleDisplay} />
                <div id="lobbies-containers">
                    <DisplayRoom room={display.displayRoom} socket={io.socket} handleDisplay={handleDisplay} />
                </div>
            </>
        )
    } else {
        // Displays the lobbies interface
        displayRender = (
            <>
                <Options 
                    handleFiltering={handleFiltering} 
                    filterBy={filterBy} 
                    clearFilter={clearFilter}
                    handleDisplay={handleDisplay}
                    displayName={displayName}
                    setDisplayName={setDisplayName}
                />
                <div id="lobbies-containers">
                    <Topnavigator clickSortHandler={clickSortHandler} sortBy={sortBy} />
                    {io.socket ? (
                        <Rooms sortBy={sortBy} filterBy={filterBy} handleDisplay={handleDisplay} socket={io.socket} displayName={displayName.value} />
                    ) : (
                        <div>
                            Loading rooms...
                        </div>
                    )}
                </div>
            </>
        )
    }

    // const handleTest = () => {
    //     io.socket.emit("test")
    // }

    return (
        <div id="lobbies-main-container">
            <div id="lobby-content-container">
                {displayRender}
            </div>
            <div id="lobby-chat-container">
                {io.socket ? (
                    <LobbyChat socket={io.socket} displayName={displayName} />
                ) : (
                    <div>
                        Connecting to chat...
                    </div>
                )}
            </div>
            {/* <div onClick={() => handleTest()}>TEST</div> */}
        </div>
    );
};

export default Lobby;
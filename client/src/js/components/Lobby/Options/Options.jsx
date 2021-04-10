import React, { useEffect, useState } from 'react';
import "./options.css"

const Options = (props) => {
    const {displayName, setDisplayName} = props

    useEffect(() => {
        const storedDisplayName = localStorage.getItem("displayName")
        if(storedDisplayName){
            setDisplayName({
                ...displayName, value: storedDisplayName
            })
        }
    }, [])

    const handleChangeDisplayName = (event) => {
        if(!event.target.value) localStorage.removeItem("displayName")
        setDisplayName({
            ...displayName, value: event.target.value
        })
    }

    const handleCheckDisplayName = () => {
        localStorage.setItem("displayName", displayName.value)
    }

    return (
        <div id="options-main-container">
            <div className="lobby-default-btn" id="options-new-lobby-btn" onClick={() => props.handleDisplay("createLobby")}>New Lobby</div>
            <div id="options-display-name-container">
                <div>Display Name:</div>
                <div id="options-display-name-input-container">
                    <input 
                        id="options-display-name-input" 
                        type="text"
                        placeholder="Anonymous"
                        value={displayName.value}
                        onChange={handleChangeDisplayName}
                    />
                    <div id="options-display-name-confirm-btn" onClick={() => handleCheckDisplayName()}>Check</div>
                </div>
            </div>
            <div id="options-filter-container">
                <div id="options-filter-header-container">
                    <div id="options-filter-header">Filters:</div>
                    <div id="options-clear-filter-btn" onClick={() => props.clearFilter()}>Clear</div>
                </div>
                <div>
                    <div id="options-filter-checkboxes-container">
                        <div onClick={() => props.handleFiltering("open", !props.filterBy.open)}>
                            <input type="checkbox" name="open" checked={props.filterBy.open} onChange={() => {}}/>
                            <label htmlFor="open">Open</label>
                        </div>
                    </div>
                    <div className="options-input-containers">
                        <label htmlFor="findLobby">Find Lobby</label>
                        <input type="text" name="findLobby" value={props.filterBy.lobbyName} onChange={(e) => props.handleFiltering("lobbyName", e.target.value)}/>
                    </div>
                    <div className="options-input-containers">
                        <label htmlFor="findPlayer">Find Player</label>
                        <input type="text" name="findPlayer" value={props.filterBy.playerName} onChange={(e) => props.handleFiltering("playerName", e.target.value)}/>
                    </div>
                    <div className="options-input-containers">
                        <label htmlFor="min-players">Min Players</label>
                        <input type="number" name="min-players" value={props.filterBy.minPlayers} onChange={(e) => props.handleFiltering("minPlayers", e.target.value)}/>
                    </div>
                    <div className="options-input-containers">
                        <label htmlFor="max-players">Max Players</label>
                        <input type="number" name="max-players" value={props.filterBy.maxPlayers} onChange={(e) => props.handleFiltering("maxPlayers", e.target.value)} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Options;
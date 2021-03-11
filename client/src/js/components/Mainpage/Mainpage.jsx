import React, { useState } from 'react';
import Lobby from "../Lobby/Lobby"

const Mainpage = () => {
    const [display, setDisplay] = useState({
        lobby: false
    })

    const changeDisplay = (newDisplay) => {
        Object.keys(display).forEach(displayKey => display[displayKey] = false)
        setDisplay({
            ...display,
            [newDisplay]: true
        })
    }

    if(display.lobby) return (
        <Lobby />
    )

    return (
        <div>
            <h1>Main page</h1>
            <h2 onClick={() => changeDisplay("lobby")}>To Lobby</h2>
        </div>
    );
};

export default Mainpage;
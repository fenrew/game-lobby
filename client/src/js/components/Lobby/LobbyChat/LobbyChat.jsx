import React, { useEffect, useState, useRef } from 'react';

import "./lobby-chat.css"

const LobbyChat = (props) => {
    const inputRef = useRef(null);
    const chatMessages = useRef(null)

    const [chat, setChat] = useState({
        messages: [],
        inputValue: ""
    })

    useEffect(() => {
        inputRef.current.focus();

        props.socket.on("newChatMessage", (response) => {
            chat.messages.push({chatMessage: response.message, dateMessage: response.dateMessage, user: response.displayName})
            setChat({...chat, inputValue: "" })
        })

        // window.addEventListener("scroll", () => {
        //     console.log(chatMessages.current)
        //     if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        //        console.log("you're at the bottom of the page");
        //        // Show loading spinner and make fetch request to api
        //     }
        //  });

         return window.removeEventListener("scroll", () => {})
    }, [])

    useEffect(() => {
        chatMessages.current.scrollIntoView()
    }, [chat.messages.length])

    const handleChatInputChange = (event) => {
        setChat({...chat, inputValue: event.target.value})
    }

    const handleChatSubmit = (event) => {
        if (event.key === 'Enter') {
            props.socket.emit("writeChatMessage", {message: event.target.value, displayName: props.displayName.value})
        }
    }

    const displayMessages = chat.messages.map((msg, i) => (
        <p key={i}>{msg.dateMessage.slice(11,19)} {msg.user || "Anonymous"}: {msg.chatMessage}</p>
    ))

    return (
        <div id="lobby-chat-main-container">
            <div id="lobby-chat-messages-container">{displayMessages} <div ref={chatMessages}></div></div>
            <input
                id="lobby-chat-input"
                ref={inputRef}
                value={chat.inputValue} type="text"
                autoComplete="off"
                placeholder="Type to chat"
                onChange={handleChatInputChange}
                onKeyDown={handleChatSubmit}
            />
        </div>
    );
};

export default LobbyChat;
import React from 'react';
import "./create-lobby-options.css"

const CreateLobbyOptions = (props) => {
    return (
        <div id="create-lobby-options-container">
            <div 
                className="lobby-default-btn" 
                id="create-lobby-options-btn" 
                onClick={() => props.handleDisplay("displayAllLobbies")}
            >Back</div>
        </div>
    );
};

export default CreateLobbyOptions;
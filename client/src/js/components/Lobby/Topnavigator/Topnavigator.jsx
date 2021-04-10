import React from 'react';
import "./topnavigator.css"

const Topnavigator = (props) => {
    const {clickSortHandler, sortBy} = props

    const sortIcon = (byType) => {
        if(!sortBy[byType]) return <div className="topnavigator-sort-by-icon"></div>

        let url = ""
        if(sortBy[byType] === 1) url = "/images/lobby-icons/sort-down-arrow.png"
        else url =  "/images/lobby-icons/sort-up-arrow.png"

        return (
            <img className="topnavigator-sort-by-icon" src={url}/>
        )
    }

    return (
        <div id="topnavigator-main-container">
            <div id="sortby-bar-container">
                <div id="sortby-bar-name" onClick={() => clickSortHandler("name")}>
                    {sortIcon("name")}
                    <p>Name</p>
                </div>
                <div id="sortby-bar-players" onClick={() => clickSortHandler("players")}>
                    {sortIcon("players")}
                    <p>Players</p>
                </div>
                <div id="sortby-bar-age" onClick={() => clickSortHandler("age")}>
                    {sortIcon("age")}
                    <p>Age</p>
                </div>
                <p id="sortby-bar-open"></p>
            </div>
        </div>
    );
};

export default Topnavigator;
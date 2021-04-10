import React, { useEffect, useState } from 'react';
import EachRoom from "./EachRoom/EachRoom"

import "./rooms.css"

// Example Room object
// [
//     {
//         id: "str",
//         name: "string",
//         players: 3,
//         maxPlayers: 8,
//         closed: false
//     }
// ]
const Rooms = (props) => {
    const [rooms, setRooms] = useState({
        list: []
    })

    useEffect(() => {
        fetch("/api/list-all-lobbies", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
              }
          }).then(response => response.json())
          .then(data => {
              setRooms({...rooms, list: data.rooms})
          })
          .catch(err => {
              console.error("Something went wrong during fetching of the rooms.", err)
          })

        props.socket.on("updatedRooms", (newRoom) => {
            const {age, roomName, maxPlayers, id, players} = newRoom
            rooms.list.push({age, roomName, maxPlayers, id, players})
            setRooms({...rooms})
        })

        return () => {
            props.socket.off("updatedRooms")
        }
    }, [])

    let filteredRooms = []

    const filterRoomsBy = () => {
        const {filterBy: { open, lobbyName, playerName, minPlayers, maxPlayers }} = props
        
        filteredRooms = rooms.list.filter(room => {
            if(open && room.closed) return false
            if(!room.roomName.toLowerCase().includes(lobbyName.toLowerCase())) return false
            if(room.players < minPlayers) return false
            if(maxPlayers > 0 && maxPlayers < room.players) return false
            return true
        })
    }

    const sortRoomsBy = () => {
        const {sortBy} = props
        const toSortBy = Object.keys(sortBy).find(key => sortBy[key])

        filteredRooms.sort((a, b) => {
            if(typeof a[toSortBy] === "string"){
                return a[toSortBy].localeCompare(b[toSortBy]) * sortBy[toSortBy]
            } else {
                return (a[toSortBy] - b[toSortBy]) * sortBy[toSortBy]
            }
        })

        filteredRooms.sort((a, b) => {
            if(a.closed && !b.closed) return 1
            else if(b.closed && !a.closed) return -1
            return 0
        })
    }

    filterRoomsBy()
    sortRoomsBy()
    const displayRooms = filteredRooms.map((room, index) => ( <EachRoom room={room} key={room.id} index={index} handleDisplay={props.handleDisplay} /> ))

    return (
        <div id="rooms-main-container">
            {displayRooms}
        </div>
    );
};

export default Rooms;
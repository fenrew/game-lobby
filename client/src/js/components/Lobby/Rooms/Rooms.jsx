import React, { useEffect, useState } from 'react';
import EachRoom from "./EachRoom/EachRoom"

import "./rooms.css"

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
              console.log("DAAAATA", data.rooms)
              setRooms({...rooms, list: data.rooms})
          })
          .catch(err => {
              console.error("Something went wrong during fetching of the rooms.", err)
          })

        props.socket.on("updatedRooms", (newRoom) => {
            const {age, roomName, maxPlayers, id, players} = newRoom
            const existingRoom =  rooms.list.find(room => room.id === newRoom.id)

            if(!existingRoom){
                rooms.list.push({age, roomName, maxPlayers, id, players})
            } else if (players.length === 0 && existingRoom){
                rooms.list.splice(rooms.indexOf(existingRoom), 1)
            } else {
                existingRoom.roomName = roomName
                existingRoom.maxPlayers = maxPlayers
                existingRoom.players = players
            }
            setRooms({...rooms})
        })

        return () => {
            props.socket.off("updatedRooms")
        }
    }, [])

    let filteredRooms = []

    const filterRoomsBy = () => {
        const {filterBy: { open, roomName, playerName, minPlayers, maxPlayers }} = props
        
        filteredRooms = rooms.list.filter(room => {
            if(open && room.closed) return false
            if(!room.roomName.toLowerCase().includes(roomName.toLowerCase())) return false
            if(room.players.length < minPlayers) return false
            if(maxPlayers > 0 && maxPlayers < room.players.length) return false
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
    const displayRooms = filteredRooms.map((room, index) => ( <EachRoom room={room} key={room.id} index={index} handleDisplay={props.handleDisplay} socket={props.socket} displayName={props.displayName} /> ))

    return (
        <div id="rooms-main-container">
            {displayRooms}
        </div>
    );
};

export default Rooms;
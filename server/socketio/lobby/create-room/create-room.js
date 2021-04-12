const Lobby = require("../../../lobby/Lobby");
const { updatedRoom } = require("../update-rooms/update-rooms");

const createRoom = (io, socket, room, creatorDisplayName) => {
  try {
    const createdRoom = Lobby._createRoom(room, {
      userId: socket.id,
      displayName: creatorDisplayName,
    });

    if (!createdRoom) {
      // TODO: Handle what happens if the room is not created
      console.log("ROOM WAS NOT CREATED");
    }

    updatedRoom(createdRoom);

    socket.join(id);
    socket.emit("createdRoomSuccess");

    console.log("Room created, current roomcount", Lobby._getAllRooms().length);
  } catch (error) {
    //TODO: Handle errors
    console.error(error);
  }
};

module.exports = { createRoom };

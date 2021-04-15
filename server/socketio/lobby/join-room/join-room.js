const Lobby = require("../../../lobby/Lobby");
const { updatedRoom } = require("../update-rooms/update-rooms");

const joinRoom = (io, socket, roomId, userDisplayName) => {
  const roomToJoin = Lobby._findRoomById(roomId);
  if (!roomToJoin) {
    // TODO: Handle error response to user
    console.info("There are no rooms with id ", roomId);
    return;
  }

  const addedToRoom = roomToJoin._addUser({
    userId: socket.id,
    userDisplayName,
  });

  if (!addedToRoom) {
    console.info(
      `The player, ${userDisplayName}, was not able to join the room: ${roomToJoin.roomName}`
    );
    return;
  }

  console.log("USESESSSESR", roomToJoin._getUsersDisplayName());
  socket.join(roomToJoin.id);

  updatedRoom(io, roomToJoin);

  socket.emit("joinedRoomSuccess", roomToJoin._displayRoom());
};

module.exports = { joinRoom };

const Lobby = require("../../../lobby/Lobby");
const { updatedRoom } = require("../update-rooms/update-rooms");

const leaveRoom = (io, socket) => {
  const room = Lobby._findUsersRoom(socket.id);
  console.log("LEAVE ROOM", room);
  if (!room) return null;

  socket.leave(room.id);
  const remainingPlayers = room._removeUser(socket.id);
  if (remainingPlayers === 0) {
    Lobby._removeRoom(room.id);
  }

  updatedRoom(io, room);
};

module.exports = { leaveRoom };

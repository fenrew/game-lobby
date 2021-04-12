const updatedRoom = (io, room) => {
  const { roomName, maxPlayers, age, id } = room;

  io.emit("updatedRooms", {
    roomName,
    maxPlayers,
    age,
    id,
    players: [creatorDisplayName],
  });
};

module.exports = { updatedRoom };

const updatedRoom = (io, room) => {
  const { roomName, maxPlayers, age, id } = room;
  const players = room._getUsersDisplayName();

  io.emit("updatedRooms", {
    roomName,
    maxPlayers,
    age,
    id,
    players,
  });
};

module.exports = { updatedRoom };

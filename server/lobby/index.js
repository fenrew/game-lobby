const Lobby = require("./Lobby.js");

module.exports = (io) => {
  const lobby = new Lobby(io);

  return lobby;
};

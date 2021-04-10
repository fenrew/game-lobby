const socketio = require("socket.io");
const Lobby = require("../lobby");

module.exports = (http) => {
  const io = socketio(http);

  io.on("connection", (socket) => {
    console.log("a user connected");
    socket.on("test", () => {
      io.emit("test", { lobby: Lobby._getAllRooms() });
    });

    socket.on("writeChatMessage", (message) => {
      if (
        !message.message ||
        typeof message.message !== "string" ||
        typeof message.displayName !== "string"
      )
        return;

      message.dateMessage = new Date();

      io.emit("newChatMessage", message);
    });

    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  });

  return io;
};

const socketio = require("socket.io");
const { createRoom } = require("./lobby/create-room/create-room");
const { joinRoom } = require("./lobby/join-room/join-room");

module.exports = (http) => {
  const io = socketio(http);

  io.on("connection", (socket) => {
    console.log("a user connected");

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

    socket.on("createRoom", ({ newRoom, creator }) => {
      createRoom(io, socket, newRoom, creator);
    });

    socket.on("joinRoom", (roomId, userDisplayName) => {
      joinRoom(io, socket, roomId, userDisplayName);
    });

    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  });

  return io;
};

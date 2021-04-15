const socketio = require("socket.io");
const { createRoom } = require("./lobby/create-room/create-room");
const { joinRoom } = require("./lobby/join-room/join-room");
const { leaveRoom } = require("./lobby/leave-room/leave-room");

module.exports = (http) => {
  const io = socketio(http);

  io.on("connection", (socket) => {
    console.info("a user connected");

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

    socket.on("joinRoom", ({ roomId, userDisplayName }) => {
      joinRoom(io, socket, roomId, userDisplayName);
    });

    socket.on("leaveRoom", () => {
      leaveRoom(io, socket);
    });

    socket.on("disconnect", () => {
      leaveRoom(io, socket);
      console.info("user disconnected");
    });
  });

  return io;
};

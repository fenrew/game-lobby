const socketio = require("socket.io");

module.exports = (http) => {
  const io = socketio(http);

  io.on("connection", (socket) => {
    console.log("a user connected");
  });

  return io;
};

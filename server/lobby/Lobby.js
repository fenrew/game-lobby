const Room = require("./Room.js");

class Lobby {
  constructor(io) {
    this.io = io;
    this.rooms = [];
    this.totalNumberOfCreatedRooms = 0;

    this.createId = () => {
      this.totalNumberOfCreatedRooms += 1;

      const rooms = this.totalNumberOfCreatedRooms.toString();
      const id = "0".repeat(18 - rooms.length) + rooms;

      return id;
    };

    this.checkRoomId = (roomId) => {
      if (typeof roomId !== "string") return false;
      return true;
    };
  }

  _createRoom() {
    const roomId = this.createId();
    const createdRoom = new Room(roomId);

    createdRoom.initialize();

    this.rooms.push(createdRoom);

    return id;
  }

  _removeRoom(roomId) {
    if (!this.checkRoomId(roomId)) return false;

    this.splice(this.rooms.indexOf(roomId), 1);

    return roomid;
  }

  _findRoom(roomId) {
    return this.rooms.find((room) => room.id === roomId);
  }

  _findUsersRoom(userId) {
    return this.rooms.find((room) =>
      room.users.find((user) => user === userId)
    );
  }
}

module.exports = Lobby;

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

    this.validRoomName = (roomName) => {
      if (!(typeof roomName === "string" || typeof roomName === "number"))
        return false;

      const roomNameStr = roomName.toString();
      if (roomNameStr.length < 1) return false;

      return true;
    };
  }

  _createRoom(name) {
    const roomId = this.createId();
    const createdRoom = new Room(roomId, name);

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

  _changeRoomName(userId, newName) {
    if (!this.validRoomName(newName)) return false;

    const isNameTaken = this.rooms.some((room) => room.name === newName);
    if (isNameTaken) return false;

    const room = this._findUsersRoom(userId);

    return room.changeName(newName);
  }
}

module.exports = Lobby;

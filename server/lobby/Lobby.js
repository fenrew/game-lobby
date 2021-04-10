const Room = require("./Room.js");

class Lobby {
  constructor() {
    this.rooms = [];
    this.totalNumberOfCreatedRooms = 0;
    this.maxRoomNameLength = 15;

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
      if (roomNameStr.length < 1 || roomNameStr.length > this.maxRoomNameLength)
        return false;
      return true;
    };

    this.validOptions = (options) => {
      if (!this.validRoomName(options.roomName)) return false;
      if (options.gameUrl && !(typeof options.gameUrl === "string"))
        return false;
      if (options.maxPlayers && options.maxPlayers > 100) return false;
      return true;
    };
  }

  _createRoom(options) {
    if (!this.validOptions(options)) return false;

    const roomId = this.createId();
    const createdRoom = new Room(roomId, options);

    createdRoom.initialize();

    this.rooms.push(createdRoom);

    return createdRoom;
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

  _getAllRooms() {
    return this.rooms;
  }
}

module.exports = new Lobby();

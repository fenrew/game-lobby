class Room {
  constructor(id, options) {
    this.id = id;
    this.roomName = options.roomName;
    this.gameUrl = options.gameUrl;
    this.maxPlayers = options.maxPlayers || 8;
    this.age = new Date();
    this.users = [];
    this.gameInstance = null;
    this.closed = false;
    this.typeOfUserId = "string";

    // Initialize the Room. If there is anything that needs to be done at creation of a room, put it here
    this.initialize = () => {
      return true;
    };

    // Checkes the users ID to verify correct input
    this.checkUserId = (userId) => {
      if (!typeof userId === "string") return false;

      return true;
    };

    // Adds a user to the room
    this.addUser = (userId) => {
      if (!this.checkUserId(userId)) return false;
      this.users.push(userId);
    };

    // Removes a user from the room
    this.removeUser = (userId) => {
      if (!this.checkUserId(userId)) return false;

      this.splice(this.users.indexOf(userId), 1);
    };

    // Promotes a user to leader in the room
    this.promoteUser = (userId) => {
      if (!this.checkUserId(userId)) return false;
      this.removeUser(userId);
      this.users.unshift(userId);
    };

    // Attaches a game instance to the room
    this.attachInstance = (gameInstance) => {
      this.gameInstance = gameInstance;
    };

    // Detaches a game instance from the room
    this.detachInstance = () => {
      this.gameInstance = null;
    };

    this.changeName = (newName) => {
      this.roomName = newName.toString();
      if (this.roomName.length < 1) return false;
      return this.roomName;
    };
  }
}

module.exports = Room;

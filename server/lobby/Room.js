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
    this._initialize = (userObj) => {
      this._addUser(userObj);
      return true;
    };

    // Checkes the users ID to verify correct input
    this.checkUserId = (userId) => {
      if (!typeof userId === "string") return false;

      return true;
    };
    this.checkUserDisplayName = (userDisplayName) => {
      if (!typeof userDisplayName === "string") return false;
      if (userDisplayName.length > 14) userDisplayName.slice(0, 14);
      if (userDisplayName.length < 2) userDisplayName + userDisplayName;

      return true;
    };

    // Adds a user to the room
    this._addUser = (userObj) => {
      if (!this.checkUserId(userObj.userId)) return false;
      if (!this.checkUserDisplayName(userObj.userDisplayName))
        userObj.userDisplayName = "Anonymous";

      this.users.push(userObj);
      return true;
    };

    // Removes a user from the room
    this._removeUser = (userId) => {
      if (!this.checkUserId(userId)) return false;

      this.splice(this.users.indexOf(userId), 1);
    };

    // Promotes a user to leader in the room
    this._promoteUser = (userId) => {
      if (!this.checkUserId(userId)) return false;
      this.removeUser(userId);
      this.users.unshift(userId);
    };

    // Attaches a game instance to the room
    this._attachInstance = (gameInstance) => {
      this.gameInstance = gameInstance;
    };

    // Detaches a game instance from the room
    this._detachInstance = () => {
      this.gameInstance = null;
    };

    this._changeName = (newName) => {
      this.roomName = newName.toString();
      if (this.roomName.length < 1) return false;
      return this.roomName;
    };

    this._getUsersDisplayName = () => {
      const usersDisplayName = [];
      this.users.forEach((user) =>
        usersDisplayName.push({ displayName: user.displayName })
      );
    };
  }
}

module.exports = Room;

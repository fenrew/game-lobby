class Room {
  constructor(id) {
    this.id = id;
    this.users = [];
    this.gameInstance = null;
    this.closed = false;
    this.typeOfUserId = "string";

    // Initialize the Room. If there is anything that needs to be done at creation of a room, put it here
    this.initialize = () => {
      return true;
    };

    this.checkUserId = (userId) => {
      if (!typeof userId === "string") return false;

      return true;
    };

    this.addUser = (userId) => {
      if (!this.checkUserId(userId)) return false;
      this.users.push(userId);
    };

    this.removeUser = (userId) => {
      if (!this.checkUserId(userId)) return false;

      this.splice(this.users.indexOf(userId), 1);
    };

    this.promoteUser = (userId) => {
      if (!this.checkUserId(userId)) return false;
      this.removeUser(userId);
      this.users.unshift(userId);
    };

    this.attachInstance = (gameInstance) => {
      this.gameInstance = gameInstance;
    };

    this.detachInstance = () => {
      this.gameInstance = null;
    };
  }
}

module.exports = Room;

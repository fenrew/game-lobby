class Chat {
  constructor() {
    this.messages = [];
    this.maxDisplayMsg = 30;
  }

  _newMessage(user, chatMessage) {
    this.messages.push({
      user,
      chatMessage,
    });
    if (this.messages.length > 30) this.messages.shift();
  }

  _getAllMessages() {
    return this.messages;
  }
}

module.exports = new Chat();

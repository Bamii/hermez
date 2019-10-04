const WebSocket = require('ws');

class Client {
  constructor(address) {
    this.address = address;
    this.ws = null;
  }

  connect() {
    this.ws = new WebSocket('ws://localhost:4000', {
      perMessageDeflate: false
    });

    return this.ws;
  }
}

module.exports = Client;


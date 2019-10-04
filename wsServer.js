const WebSocket = require('ws');
const { cls } = require('./utils');

class Connection {
  constructor(port) {
    this.port = port;
  }
  
  connect() {
    this.wss = new WebSocket.Server({ port: this.port });
    return this.wss;
  }
}

module.exports = Connection;


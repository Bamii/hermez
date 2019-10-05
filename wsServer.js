const WebSocket = require('ws');
class Connection {
  constructor(port) {
    this.port = port;
  }
  
  connect() {
    this.wss = new WebSocket.Server({ host: 'localhost', port: this.port });
    return this.wss;
  }

  start() {
    return this.connect();
  }
}

module.exports = Connection;


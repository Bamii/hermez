const WebSocket = require('ws');
class Connection {
  constructor(host, port) {
    this.host = host;
    this.port = port;
  }
  
  connect() {
    this.wss = new WebSocket.Server({ host: this.host, port: this.port });
    return this.wss;
  }

  start() {
    return this.connect();
  }
}

module.exports = Connection;


const WsServer = require("./ws/wsServer");
const EventEmitter = require("events");

// function anon() {
//   const port = getInputFromUser("Please enter the port you'll like to use: ");
//   // now to find the ipaddress... hehe
//   console.log(port);
//   const server = new WsServer("localhost", port).connect();

//   server
//     .on("listening", ws => {
//       cls();
//       const address = `ip address => ${ip.address()}:${server.address().port}`;
//       displayCreationStatus(true, address);
//       console.log(address);
//     })
//     .on("error", err => {
//       cls();
//       displayCreationStatus(false, err.code);
//       serveMenu("1");
//     })
//     .once("connection", () => cls())
//     .on("connection", ws => {
//       console.log("Found one connection!");
//       console.log("Here's a list of the files in this directory.");
//       console.log();
//       const files = fs.readdirSync(".", { withFileTypes: true });
//       files.forEach((file, index) =>
//         console.log(
//           `[${index + 1}] ${file.name} ${file.isDirectory() ? "(dir)" : ""}`
//         )
//       );

//       (function sendThisFilePlease() {
//         const filename = getInputFromUser(
//           'Enter an option\n(enter "m" to disconnect and go back to the menu):'
//         );

//         if (filename === "m") {
//           server.close(() => {
//             main();
//           });
//         } else {
//           sendFile({ files, ws, filename }, () => sendThisFilePlease());
//         }
//       })();
//     });
// }

class Server {
  constructor(host, port) {
    this._host = host;
    this._port = port;
    this._server = new WsServer(this._host, this._port);
    this._me = new EventEmitter();
    this._connections = [];
    return this;
  }

  connect() {
    const that = this;
    this._server
      .connect()
      .on("listening", () => this._me.emit("listen"))
      .on("error", () => this._me.emit("error"))
      .on("connection", ws => {
        this._connections.push({ ws });
        that._me.emit("connect");
      });
    return this._me;
  }

  disconnect() {}

  address() {}
}

module.exports = Server;

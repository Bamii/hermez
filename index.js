#!/usr/bin/env node
const fs = require('fs');
const ip = require('ip');

const {
  cls,
  sendFile,
  displayHelp,
  displayExitMessage,
  displayMenu,
  getInputFromUser,
  displayCreationStatus
} = require('./utils');

function main() {
  const menu = {
    "1": "Create connection",
    "2": "Connect to network",
    "3": "Help",
    "4": "Exit"
  };

  // 1. Display menu and get input from the user.
  displayMenu(menu);

  const topMenuOption = getInputFromUser('Enter an option: ', Object.keys(menu));
  console.log();

  // function to serve each item on the menu.
  function serveMenu(topMenuOption) {
    switch(topMenuOption) {
      case "1":
        const WsServer = require('./wsServer');

        const port = getInputFromUser("Please enter the port you'll like to use: ");
        const server = (new WsServer(port)).connect();
        
        server
          .on('listening', (ws) => {
            displayCreationStatus(true, port);
            console.log();
            console.log('listening for connections...');
            console.log(server.address());
            console.log(ip.address());
          })
          .on('error', (err) => {
            displayCreationStatus(false, err.code);
            serveMenu('1');
          })
          .on('connection', (ws) => {
            cls();
            console.log('Found one connection!');
            console.log("Here's a list of the files in this directory.")
            const files = fs.readdirSync('.', { withFileTypes: true });

            files.forEach((file, index) => console.log(`[${index+1}] ${file.name} ${file.isDirectory() ? "(dir)" : ""}`));

            sendFile(files, ws, main, server);
          });
        break;

      case "2":
        const WsClient = require('./wsClient');

        const address = getInputFromUser('Please enter the address of the computer you wish to connect to: ');
        const client = new WsClient(address);
        // console.log(client.connect())
        let filename = '';
        let writer;
        let start;
        let end;

        let a = client
          .connect()

        a
          .on('open', () => {
            cls();
            console.log("-----------------------------------------")
            console.log("up, up, and away!!!")
            console.log("-----------------------------------------")
            // console.log("Here's a list of the files in this directory.")
            // fs
            //   .readdirSync('.', { withFileTypes: true })
            //   .forEach((file, index) => console.log(`[${index+1}] ${file.name}`));
          })
          .on('close', () => {
            main();
          })
          .on('error', (ws, err) => {
            console.log('err', err);
          })
          .on('message', (data) => {
              if (data === 'START') {
                start = new Date();
              } else if (data === "DONE") {
                end = new Date();
                console.log(`Done receiving ${filename} in ${(end-start)/1000} seconds`)
                writer.close();
              } else if (typeof data === 'string') {
                filename = data;
                writer = fs.createWriteStream(`test-${data}`);
              } else {
                writer.write(data);
              }
            });
            
        break;

      case "3":
        displayHelp(main);
        break;

      case "4":
        displayExitMessage();
        process.exit(0);
    
      default:
    }
  }

  serveMenu(topMenuOption);
}

main();

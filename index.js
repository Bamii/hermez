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
  function serveMenu(option) {
    switch(option) {
      case "1":
        const WsServer = require('./ws/wsServer');

        const port = getInputFromUser("Please enter the port you'll like to use: ");
        // now to find the ipaddress... hehe
        console.log(port);
        const server = (new WsServer('localhost', port)).connect();
        
        server
          .on('listening', (ws) => {
            cls();
            const address = `ip address => ${ip.address()}:${server.address().port}`;
            displayCreationStatus(true, address);
            console.log(address);
          })
          .on('error', (err) => {
            cls()
            displayCreationStatus(false, err.code);
            serveMenu('1');
          })
          .on('connection', (ws) => {
            cls();
            console.log('Found one connection!');
            console.log("Here's a list of the files in this directory.")
            console.log();
            const files = fs.readdirSync('.', { withFileTypes: true });
            files.forEach((file, index) => console.log(`[${index+1}] ${file.name} ${file.isDirectory() ? "(dir)" : ""}`));

            (function sendThisFilePlease(){
              const filename = getInputFromUser('Enter an option\n(enter "m" to disconnect and go back to the menu):');

              if (filename === "m") {
                server.close(() => {
                  main();
                });
              } else {
                sendFile({ files, ws, filename: filename - 1 }, () =>  sendThisFilePlease());
              }
            })()
          });
        break;

      case "2":
        const WsClient = require('./ws/wsClient');

        const address = getInputFromUser('Please enter the address of the computer you wish to connect to: ');
        const client = new WsClient(address);
        
        let filename = '', writer, start, end;

        client
          .connect()
          .on('open', () => {
            cls();
            console.log("-----------------------------------------")
            console.log("* up, up, and away!!!")
            console.log("-----------------------------------------")
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
                console.log();
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
        break;
    
      default:
    }
  }

  serveMenu(topMenuOption);
}

main();

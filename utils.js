const rlsync = require('readline-sync');
const fs = require('fs');

function displayMenu(items) {
  // art.font('sendit', 'Doom', text => {
    console.log("\u001b[2J")
    console.log("--------------------------------------------");
    console.log("||                  HERMEZ                ||");
    console.log("--------------------------------------------");
    console.log("||  send files pc to pc. pretty fast too  ||");
    console.log("--------------------------------------------");
    Object.values(items).map((d, index) => console.log(`[${index+1}]. ${d}`));
    console.log();
  // });
}

function displayHelp(cb) {
  console.log("\u001b[2J")
  console.log('------------------------------------------------------------------');
  console.log("                              HELP                                ");
  console.log('------------------------------------------------------------------');
  console.log('| 1. run the program on computer A and select option 1           |')
  console.log('| 2. enter a port number and wait for connection                 |')
  console.log('| 3. run the program on computer B and select option 2           |')
  console.log('| 4. enter the address displayed on computer A                   |')
  console.log('|                                                                |')
  console.log('|    ** at this stage, Both computers should have a        **')
  console.log('|    ** bi-directonal channel in that each computers       **')
  console.log('|    ** can transfer data                                  **')
  console.log('|    ** a list of the files available in that directory    **')
  console.log("|    ** is displayed. i.e computer A's files are displayed **")
  console.log("|    ** so that (s)he can choose which files to transfer   **")
  console.log("|    ** to computer B                                      **")
  console.log('------------------------------------------------------------------');
  const a = getInputFromUser('Enter "m" to go back to menu.', "m");

  if (a === "m") {
    cb();
  }
}

function displayList() {

}

function getInputFromUser(question, limit = []) {
  console.log(question);

  return rlsync.prompt({
    limit,
    limitMessage: "Sorry, that's not a valid option"
  });
}

function displayExitMessage(){
  console.log("-----------------------------------------------------------------")
  console.log("|  Thank you for using hermes! Please share with your friends.  |");
  console.log("-----------------------------------------------------------------")
}

function displayCreationStatus(status, extra) {
  if (status) {
    console.log('-------------------------------------------------------');
    console.log('| Connection created.                                 |')
    console.log('-------------------------------------------------------');
    console.log('| You can connect to this server by running           |')
    console.log('| this program on another device, and selecting       |')
    console.log('| "Connect to network" in the menu options            |')
    console.log('| and the entering this ip address below when promted |')
    console.log(`|    ip => localhost:${extra}                     |`)
    console.log('-------------------------------------------------------');
    console.log('| when the other system connects, a list of files (in |');
    console.log('| the current directory) is displayed so the user can |');
    console.log('| pick which he wants to transfer                     |');
    console.log('-------------------------------------------------------');
  } else {
    console.log('-------------------------------------------------------');
    console.log('| Connection could not be created.                    |')
    console.log('-------------------------------------------------------');
    console.log(`| sorry, an error occured: ${extra}`);
    console.log('-------------------------------------------------------');
  }
}

function cls() {
  console.log("\u001b[2J");
}

function sendFile(files, ws, menu, server) {
  console.log();
  const filename = getInputFromUser('Enter an option\n(enter "m" to disconnect and go back to the menu):');

  if (filename === "m") {
    server.close(() => {
      menu();
    });
  } else {
    const fl = (files.map(file => file.name))[filename-1];
  
    ws.send(fl)
  
    const selectedFile = fs.createReadStream(fl);
  
    selectedFile
      .on('ready', () => {
        console.log(`Started sending ${fl}...`);
        ws.send('START');
      })
      .on('data', (chunk) => {
        ws.send(chunk);
      })
      .on('close', () => {
        console.log(`Done sending ${fl}!`)
        ws.send('DONE');
        sendFile(files, ws, menu, server);
      });
  }
}

module.exports = {
  cls,
  sendFile,
  displayMenu,
  displayList,
  displayHelp,
  getInputFromUser,
  displayExitMessage,
  displayCreationStatus
}
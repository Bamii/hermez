const rlsync = require("readline-sync");
const fs = require("fs");

function displayMenu(items) {
  console.log("\u001b[2J");
  console.log("--------------------------------------------");
  console.log("||                 HERMEZ                 ||");
  console.log("--------------------------------------------");
  console.log("||  send files pc to pc. pretty fast too  ||");
  console.log("--------------------------------------------");
  Object.values(items).map((d, index) => console.log(`[${index + 1}]. ${d}`));
  console.log();
  return;
}

function displayHelp(cb) {
  cls();
  console.log(
    "------------------------------------------------------------------"
  );
  console.log(
    "                              HELP                                "
  );
  console.log(
    "------------------------------------------------------------------"
  );
  console.log(
    "| 1. run the program on computer A and select option 1           |"
  );
  console.log(
    "| 2. enter a port number and wait for connection                 |"
  );
  console.log(
    "| 3. run the program on computer B and select option 2           |"
  );
  console.log(
    "| 4. enter the address displayed on computer A                   |"
  );
  console.log(
    "------------------------------------------------------------------"
  );
  const a = getInputFromUser('Enter "m" to return to menu', ["m"]);

  if (a === "m") {
    cb();
  }
  return;
}

function displayList() {
  return;
}

function getInputFromUser(question, limit = []) {
  console.log(question);

  return rlsync.prompt({
    limit,
    limitMessage: "Sorry, that's not a valid option"
  });
}

function displayExitMessage() {
  console.log(
    "-----------------------------------------------------------------"
  );
  console.log(
    "|  Thank you for using hermes! Please share with your friends.  |"
  );
  console.log(
    "-----------------------------------------------------------------"
  );
  return;
}

function displayCreationStatus(status, extra) {
  if (status) {
    console.log("-------------------------------------------------------");
    console.log("| Connection created.                                 |");
    console.log("-------------------------------------------------------");
    console.log("| You can connect to this server by running           |");
    console.log("| this program on another device, and selecting       |");
    console.log('| "Connect to network" in the menu options            |');
    console.log("| and the entering this ip address below when promted |");
    console.log(`|    ip => ${extra} `);
    console.log("-------------------------------------------------------");
    console.log("| when the other system connects, a list of files (in |");
    console.log("| the current directory) is displayed so the user can |");
    console.log("| pick which he wants to transfer                     |");
    console.log("-------------------------------------------------------");
    console.log();
    console.log("listening for connections...");
  } else {
    console.log("-------------------------------------------------------");
    console.log("| Connection could not be created.                    |");
    console.log("-------------------------------------------------------");
    console.log(`| sorry, an error occured: ${extra}`);
    console.log("-------------------------------------------------------");
  }
  return;
}

function cls() {
  console.log("\u001b[2J");
}

function sendFile({ files, ws, filename }, cb) {
  // sends the filename to the client;
  const fl = files.map(file => file.name)[filename - 1];
  ws.send(fl);

  // create a readStream using the filename
  const selectedFile = fs.createReadStream(fl);

  // SEND!!.
  selectedFile
    .on("ready", () => {
      console.log(`Started sending ${fl}...`);
      ws.send("START");
    })
    .on("data", chunk => {
      ws.send(chunk);
    })
    .on("close", () => {
      console.log(`Done sending ${fl}!`);
      console.log();
      ws.send("DONE");
      cb();
    });
  return;
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
};

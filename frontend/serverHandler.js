const fs = require('fs');
const os = require('os');
const ip = require('ip');
const bp = require('body-parser');
const WsServer = require('../ws/wsServer.js');
const WsClient = require('../ws/wsClient');
const { responseBuilder, is } = require('./src/utils/toolbox');
const { Transform } = require('stream');

let server = null;
let connections = {};
let serverName;
const home = os.homedir();
let downloadFolder;

function validFolder(path) {
  return fs.existsSync(path);
}

function serverHandler(app, s, c) {
  app.use(bp.json({ type: 'application/json' }));

  // creating the server
  // ::self
  app.post('/ws', function(req, res) {
    const { port, nickname } = req.body;
    let streams = {};
    const home = os.homedir();
    serverName = nickname;

    if (validFolder(`${home}/Documents`) && !validFolder(`${home}/Documents/hermez`)) {
      downloadFolder = `${home}/Documents/hermez`;
      fs.mkdir(`${home}/Documents/hermez`, { recursive: true }, (err) => {
        if (err) return;
      });
    }

    if (server == null) {
      server =  (new WsServer('0.0.0.0', port)).connect();
      
      server.on('connection', (ws) => {
        ws.on('message', (m) => {
          if (is('string', m) && m.split(" ")[0] === 'nickname') {
            const [type, message] = m.split(" ");
            switch(type) {
              case 'nickname':
                connections[message] = ws;
                return;

              default:
                break
            }
          } else if (is('string', m) && m === 'START') {
            
          } else if (is('string', m) && m.split(" ")[0] === "DELETE") {
            const [, nickname] = m.split(" ");
            const client = connections[nickname];

            // close the connection and remove it from the list on the server.
            client.close();
            delete connections[nickname];
          } else if (is('string', m) && m.split(" ")[0] === "DONE") {
            const [, nickname, ...fname] = m.split(" ");
            const filename = fname.join(" ");

            if (server !== nickname) {
              streams[filename].close();
              delete streams[filename];
            }

            for (let nick in connections) {
              const sock = connections[nick];
              if (nick === nickname) {
                continue;
              } else {
                sock.send(m);
              }
            }
          } else if (Buffer.isBuffer(m)) {
            const { filename, chunk, nickname } = JSON.parse(m.toString());
            
            if (serverName !== nickname) {
              if (!streams.hasOwnProperty(filename)) {
                console.log("Started receiving file...")
                streams[filename] = fs.createWriteStream(`${home}/Documents/hermez/${filename}`);
              }

              if (!is('undefined', chunk)) {
                streams[filename].write(Buffer.from(Object.values(chunk)));
              }
            }

            for (let nick in connections) {
              const sock = connections[nick];
              if (nick === nickname) {
                // don't send to the same client.
                continue;
              } else {
                sock.send(m);
              }
            }
          }
        });
      });
      server.on('error', () => res.status(500).send(responseBuilder('An Error Occured while creating the server.')));
      
      res.status(201).send(responseBuilder("Server Created", { ip: ip.address() }));
      return;
    }
  
    res.status(200).send(
      responseBuilder(
        "Still here",
        {
          "connections-ln": Object.keys(connections).length,
          "connections": Object.keys(connections)
        }
      )
    );
    return;
  })

  // creating and connecting client to server.
  // ::self
  app.put('/ws', function(req, res) {
    const { nickname } = req.body;
    const streams = {};
    
    if (validFolder(`${home}/Documents`) && !validFolder(`${home}/Documents/hermez`)) {
      downloadFolder = `${home}/Documents/hermez`;
      fs.mkdir(`${home}/Documents/hermez`, { recursive: true }, () => {
        if (err) return;
      });
    }

    // take note of the ip address.
    // const client = new WsClient('172.20.10.6:3001').connect();
    const client = new WsClient('0.0.0.0:3001').connect();
    client
      .on('open', () => {
        console.log('created client on the server');
        client.send(`nickname ${nickname}`);
        res.status(200).send(responseBuilder("Successfully opened a client!", { nickname }));
      })
      .on('close', () => console.log('connection closed on server'))
      .on('error', (err) => res.status(500).send(responseBuilder(err)))
      .on('message', (data) => {
        if (Buffer.isBuffer(data)) {
          const { filename, chunk } = JSON.parse(data.toString());
          streams[filename].write(Buffer.from(chunk.data));
        } else if (data === 'START') {
        } else if (is('string', data) && data.split(" ")[0] === "DONE") {
          const [,, ...fname] = data.split(" ");
          console.log(`Done receiving ${fname.join(" ")}`)
          console.log();
          streams[fname.join(" ")].close();
          delete streams[fname.join(" ")];
        } else if (is('string', data)) {
          streams[data] = fs.createWriteStream(`${home}/Documents/hermez/${filename}`);
        }
      });
  })

  // the sending facility.
  // ::self
  app.post('/ws-send', function(req, res) {
    const { filenames } = req.body;
    let count = 0;

    if (!is('array', filenames)) {
      res.status(500).send(responseBuilder('The filenames property must be an array'));
      return;
    }
    
    filenames.map(filename => {
      const sockets = Object.values(connections);
      
      for (let socket of sockets) {
        socket.send(filename);
  
        // create a readStream using the filename
        const selectedFile = fs.createReadStream(filename);
        const transform = new Transform({
          objectMode: true,
          readableObjectMode: true,
          transform(chunk, encoding, callback) {
            const z = { filename, chunk };
            callback(null, Buffer.from(JSON.stringify(z)));
          }
        })
        
        // SEND!!.
        selectedFile
          .on("ready", () => {
            console.log(`Started sending ${filename}...`);
            socket.send("START");
          })
          .pipe(transform)
          .on("data", chunk => {
            count++;
            console.log(chunk);
            console.log(Object.prototype.toString.call(chunk))
            socket.send(Buffer.from(chunk))
          })
          .on('end', () => {
            selectedFile.close();
            console.log(count);
            console.log(`Done sending ${filename}!`);
            console.log();
            socket.send(`DONE ${filename}`);
            // res.status(200).send(responseBuilder(`Successully sent ${filename}`));
          });
          // .on('close');
        return;
      }
    })
  })

  // deleting the server.
  // ::self
  app.delete('/ws', function(req, res) {
    if (server === null && !app.get('hermez-server')) {
      res.status(500).send(responseBuilder('No server exists at the moment.'))
      return;
    }

    server.close();
    server = null;
    connections = {};
    
    res.send({
      status: 200,
      message: 'Successfully deleted the server.',
    })
    return;
  })
}

module.exports = serverHandler;

/* 

[
  Dirent { name: '.babelrc', [Symbol(type)]: 1 },
  Dirent { name: '.gitignore', [Symbol(type)]: 1 },
  Dirent { name: '.npmignore', [Symbol(type)]: 1 },
  Dirent { name: 'Dockerfile', [Symbol(type)]: 1 },
  Dirent { name: 'LICENSE.MD', [Symbol(type)]: 1 },
  Dirent { name: 'README.md', [Symbol(type)]: 1 },
  Dirent { name: 'dist', [Symbol(type)]: 2 },
  Dirent { name: 'index.html', [Symbol(type)]: 1 },
  Dirent { name: 'node_modules', [Symbol(type)]: 2 },
  Dirent { name: 'package-lock.json', [Symbol(type)]: 1 },
  Dirent { name: 'package.json', [Symbol(type)]: 1 },
  Dirent { name: 'public', [Symbol(type)]: 2 },
  Dirent { name: 'serverHandler.js', [Symbol(type)]: 1 },
  Dirent { name: 'src', [Symbol(type)]: 2 },
  Dirent { name: 'tailwind.config.js', [Symbol(type)]: 1 },
  Dirent { name: 'tests', [Symbol(type)]: 2 },
  Dirent { name: 'webpack.config.js', [Symbol(type)]: 1 }
]

*/
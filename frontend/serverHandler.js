const fs = require('fs');
const ip = require('ip');
const bp = require('body-parser');
const WsServer = require('../ws/wsServer.js');
const WsClient = require('../ws/wsClient');
const { responseBuilder, is } = require('./src/utils/toolbox');

let server = null;
let connections = {};
let filename = '', writer, start, end;

function serverHandler(app, s, c) {
  app.use(bp.json({ type: 'application/json' }));

  // creating the server
  // ::self
  app.post('/ws', function(req, res) {
    const { port } = req.body;

    console.log(ip.address());
    const files = fs.readdirSync('./', { withFileTypes: true });
    const files2 = files.sort(((a,b) => a.isDirectory() ? -1 : 1));
    const inner = fs.readdirSync(`./${files2[0].name}`, { withFileTypes: true });

    if (!app.get('hermez-server') && server == null) {
      server =  (new WsServer('0.0.0.0', 3001)).connect();
      app.set('hermez-server', server);

      server.on('connection', (ws) => {
        ws.on('message', (m) => {
          const [type, message] = m.split(" ");
          switch(type) {
            case 'nickname':
              connections[message] = ws;
              return;

            default:
              break
          }
        });
      });

      server.on('error', () => res.status(500).send(responseBuilder('An Error Occured while creating the server.')));

      server.on('message', (data) => {
        console.log(`on server: ${data}`);
      })
      
      res.status(201).send(responseBuilder("Server Created", { ip: ip.address() }));
      return;
    }
  
    // console.log(files2);
    // console.log(inner);
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
  app.get('/ws', function(req, res) {
    const { nickname, downloadFolder } = req.body;

    
    // take note of the ip address.
    // const client = new WsClient('172.20.10.6:3001').connect();
    const client = new WsClient('0.0.0.0:3001').connect();

    client
      .on('open', () => {
        client.send(`nickname ${nickname}`);
        res.cookie('hermez-nickname', nickname);
        res.status(200).send(responseBuilder("Successfully opened a client!", { nickname }));
      })
      .on('close', () => console.log('connection closed'))
      .on('error', (err) => res.status(500).send(responseBuilder(err)))
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

  })

  // the sending facility.
  // ::self
  app.post('/ws-send', function(req, res) {
    const { filenames } = req.body;

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
  
        // SEND!!.
        selectedFile
          .on("ready", () => {
            console.log(`Started sending ${filename}...`);
            ws.send("START");
          })
          .on("data", chunk => ws.send(chunk))
          .on("close", () => {
            console.log(`Done sending ${filename}!`);
            console.log();
            ws.send("DONE");
            res.status(200).send(responseBuilder(`Successully sent ${filename}`));
          });
        return;
      }
    })
  })

  // random route.
  app.get('/wz', function(req, res) {
    console.log(res.get('hermez-nickname'));
    res.status(200).send({ message: res.get('hermez-nickname') })
  })

  // disconnecting clients...
  // deleting the clients... i.e updating the server table.
  // ::cross
  app.patch('/ws', function(req, res) {
    const { nickname } = req.body;
    const client = connections[nickname];

    // close the connection and remove it from the list on the server.
    client.close();
    delete connections[nickname];
    res.status(200).send(responseBuilder(`Successfully deleted the client ${nickname}.`))
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
    app.set('hermez-server', null);
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
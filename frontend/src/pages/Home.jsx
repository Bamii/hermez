import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../public/assets/info-icon.png'
import Cog from '../../public/assets/cog.png'

const state = {
}

const Home = () => {
  const [selectedMode, setMode] = useState(0);
  const [port, setPort] = useState("");
  const [nick, setNick] = useState("");

  useState(() => {
    setMode(0);
  }, [true]);

  const seeProcess = () => {
    const client = new WebSocket('ws://0.0.0.0:3001');

    client.onopen = () => {
      console.log('open');
      setTimeout(() => {
        client.close();
      }, 5000);
    }
    client.onmessage = (data) => {
      console.log(data.data);
    }
    client.onclose = () => {
      console.log('closed');
      client.send('conn has closed');
    }
    client.onerror = () => {
      console.log('error');
    }
  }

  const seeProcess2 = () => {
    fetch('/ws', { method: 'GET' })
      .then((data) => data.json())
      .then(({ data })=> {
        console.log(data.stdout);
      });
  }

  return (
    <div className="container mx-auto text-primary">
      <div className="w-full h-screen m-auto flex flex-col items-center justify-end text-center">

        <div className="py-2 px-2 bg-secondary w-auto flex rounded-lg">
          <div
            onClick={(e) => setMode(Number.parseInt(e.target.dataset.position))}
            data-position={0}
            className={`cursor-pointer py-2 px-6 w-auto rounded-lg ${selectedMode === 0 ? "bg-primary text-white" : "bg-none"}`}
          >
            create <br/> connection
          </div>
          <div
            onClick={(e) => setMode(Number.parseInt(e.target.dataset.position))}
            data-position={1}
            className={`cursor-pointer py-2 px-6 w-auto rounded-lg ${selectedMode === 1 ? "bg-primary text-white" : "bg-none"}`}
          >
            connect to <br/> server
          </div>
        </div>

        {selectedMode === 0 &&
          <React.Fragment>
            <div className="py-10 pb-3 w-auto">
              <input
                type="text"
                value={port}
                onChange={(e) => setPort(e.target.value)}
                className="py-3 px-10 border border-secondary rounded-lg"
                placeholder="enter a port number."
              />
            </div>
            <div className="py-3 pb-24 w-auto">
              <button onClick={seeProcess2} className="py-3 px-8 bg-white border border-secondary rounded-lg">
                *flap flap*
              </button>
            </div>
          </React.Fragment> }

        {selectedMode === 1 &&
          <React.Fragment>
            <div className="py-10 pb-3 w-auto">
              <input
                type="text"
                value={port}
                onChange={(e) => setPort(e.target.value)}
                className="py-3 px-10 border border-secondary rounded-lg"
                placeholder="enter the port no."
              />
            </div>
            <div className="py-3 pb-5 w-auto">
              <input
                type="text"
                value={nick}
                onChange={(e) => setNick(e.target.value)}
                className="py-3 px-10 border border-secondary rounded-lg"
                placeholder="enter a nickname."
              />
            </div>
            <div className="py-3 pb-24 w-auto">
              <button onClick={seeProcess} className="py-3 px-8 bg-white border border-secondary rounded-lg">
                *flippity flappitty*
              </button>
            </div>
          </React.Fragment> }

        {/* Header... */}
        <div className="header h-60 w-full flex justify-between items-center p-10">
          <div className="h-8 w-8">
            <Link to="/about">
              <img src={Icon} alt="More Information."/>
            </Link>
          </div>
          <div className="text-6xl text-primary">hermez</div>
          <div className="h-8 w-8">
            <Link to="/settings">
              <img src={Cog} alt="Settings" alt=""/>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

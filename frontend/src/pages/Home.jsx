import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../public/assets/info-icon.png'
import Cog from '../../public/assets/cog.png'

const Home = () => {
  const [selectedMode, setMode] = useState(0);
  const [port, setPort] = useState(0);

  useState(() => {
    setMode(0);
  }, [true]);

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

        <div className="py-10 pb-3 w-auto">
          <input
            type="number"
            value={port}
            maxLength={5}
            onChange={(e) => setPort(e.target.value)}
            className="py-3 px-10 border border-secondary rounded-lg"
            placeholder="enter a port number."
          />
        </div>
        <div className="py-3 pb-24 w-auto">
          <button className="py-3 px-8 bg-white border border-secondary rounded-lg">
            *flap flap*
          </button>
        </div>

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

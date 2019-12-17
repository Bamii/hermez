import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import { Link, Redirect } from 'react-router-dom';
import { setDownloadFolder } from "../actions";
import Icon from '../../public/assets/info-icon.png'
import Cog from '../../public/assets/cog.png'

const Home = (props) => {
  const [selectedMode, setMode] = useState(0);
  const [port, setPort] = useState("");
  const [nick, setNick] = useState("");
  const [done, setDone] = useState(0);
  const [ipAdd, setIp] = useState("");

  const validate = (input, limit, operator) => {
    switch(operator) {
      case 'less':
        return input.length <= limit;
        break;

      case 'more':
        return input.length >= limit;
        break;

      case 'equal':
        return input.length === limit;
        break;
    }
  }

  const openServer = () => {
    if (validate(port, 4, 'equal')) {
      axios.post('/ws', { port: Number.parseInt(port) })
        .then(data => {
          const ip = data.data.extra;
          setIp(ip);
          setDone(1);
          // return data.data;
        })
        .catch(() => {
          // do something about the error.
        })
    } else {
      // do something about the error.
      console.log('enter four numbers')
    }
  }

  const connectClient = () => {
    if (validate(nick, 5, 'more') && validate(port, 4, 'equal')) {
      axios.get('/ws', { nickname: nick })
        .then((data) => {
          console.log(data.data);
          setDone(1);
          return data.data;
        })
        .catch(() => {})
    } else {
      // do something about the error
      // use a toast maybe??
      console.log('enter 5 or more characters!')
    }
  }

  return (
    done === 1
      ? 
        <Redirect
          push
          to={{
            pathname: selectedMode === 0 ? "/host" : "/client",
            state: { ip: ipAdd, nickname: nick }
          }}
        />
      :
        <div className="container mx-auto text-primary">
          <div className="w-full h-screen m-auto flex flex-col items-center justify-end text-center">

            <div className="py-2 px-2 bg-secondaryLight w-auto flex rounded-lg">
              <div
                onClick={(e) => setMode(Number.parseInt(e.target.dataset.position))}
                data-position={0}
                className={`cursor-pointer  py-2 px-6 w-auto rounded-lg
                  ${selectedMode === 0 ? "bg-primaryLight text-white" : "bg-none text-primaryDark"}`}
              >
                create <br/> connection
              </div>
              <div
                onClick={(e) => setMode(Number.parseInt(e.target.dataset.position))}
                data-position={1}
                className={`cursor-pointer py-2 px-6 w-auto rounded-lg
                  ${selectedMode === 1 ? "bg-primaryLight text-white" : "bg-none text-primaryDark"}`}
              >
                connect to <br/> server
              </div>
            </div>

            <React.Fragment>
              <div className="py-10 pb-3 w-auto">
                <input
                  type="text"
                  value={port}
                  onChange={(e) => setPort(e.target.value)}
                  className="py-3 px-10 rounded-lg text-primary bg-secondaryLighter"
                  placeholder="enter the port no."
                />
              </div>
              <div className="py-3 pb-5 w-auto">
                <input
                  type="text"
                  value={nick}
                  onChange={(e) => setNick(e.target.value)}
                  className="py-3 px-10 rounded-lg text-primary bg-secondaryLighter"
                  placeholder="enter a nickname."
                />
              </div>
              <div className="py-3 pb-24 w-auto">
                <button
                  style={{ transition: 'all .3s ease-in ' }}
                  onClick={() => selectedMode === 0 ? openServer : connectClient}
                  className="py-3 px-8 bg-white border border-secondary rounded-lg"
                >
                  {selectedMode === 0 ? "*flap flap*" : "*flippity flappitty*"}
                </button>
              </div>
            </React.Fragment>

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

const mapStateToProps = ({ downloadFolder }) => {
  return { store: downloadFolder };
}

const mapDispatchToProps = { setDownloadFolder }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Home));

import React, { Component } from 'react';
import Icon from '../../public/assets/info-icon.png'
import Cog from '../../public/assets/cog.png'

export default class App extends Component {
  render() {
    return (
      <div className="container mx-auto text-primary">
        <div className="w-full h-screen m-auto flex flex-col items-center justify-end text-center">

          <div className="py-2 px-2 bg-secondary w-auto flex rounded-lg">
            <div className="py-2 px-6 w-auto rounded-lg bg-primary text-white">
              create <br/> connection
            </div>
            <div className="py-2 px-6 w-auto rounded-lg bg-none">
              connect to <br/> server
            </div>
          </div>
          <div className="py-10 pb-3 w-auto">
            <input type="text" className="py-3 px-10 border border-secondary rounded-lg" placeholder="enter a port number."/>
          </div>
          <div className="py-3 pb-24 w-auto">
            <button className="py-3 px-8 bg-white border border-secondary rounded-lg">
              *flap flap*
            </button>
          </div>
          <div className="header h-60 w-full flex justify-between items-center p-10">
            <div className="h-8 w-8"><img src={Icon} alt="info icon"/></div>
            <div className="text-6xl text-primary">hermez</div>
            <div className="h-8 w-8"><img src={Cog} alt="cog icon." alt=""/></div>
          </div>
        </div>
      </div>
    );
  }
}
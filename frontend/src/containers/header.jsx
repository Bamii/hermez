import React from 'react';
import Icon from '../../public/assets/info-icon2x.png'
import Power from '../../public/assets/power2x.png'
import Cog from '../../public/assets/cog.png'

const Header = () => {
  return (
    <div className="header w-full flex justify-between items-center p-10 border-b-2 border-secondary">
      <div className="h-8 w-8"><img src={Icon} alt="info icon"/></div>
      <div className="text-4xl text-primary">hermez</div>
      <div className="flex">
        <div className="h-8 w-8 mr-10"><img src={Cog} alt="cog icon." alt=""/></div>
        <div className="h-8 w-8"><img src={Power} alt=""/></div>
      </div>
    </div>
  )
}

export default Header;

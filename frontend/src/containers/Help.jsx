import React from 'react';
import Header from './header.jsx';

const Help = () => {
  return (
    <div className="container mx-auto text-secondaryDark">
      <Header/>
      <div className="py-10 header w-full text-center text-6xl flex justify-center">
        <div className="border-b-2 border-secondaryDark py-2 hover:text-primaryDark cursor-pointer">help</div>
        <div className="py-2 px-3">&</div>
        <div className="py-2 hover:text-primaryDark cursor-pointer">about</div>
      </div>

      <div className="py-2 px-2 text-center w-1/2 mx-auto bg-white flex justify-center rounded-lg">
       
      </div>
    </div>
  );
};

export default Help;

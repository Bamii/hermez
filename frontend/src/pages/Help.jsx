import React, { useState } from 'react';
import Header from '../containers/Header.jsx';

const Help = () => {
  const [page, selectPage] = useState(0);

  return (
    <div className="container mx-auto text-secondaryDark">
      <div className="py-10 header w-full text-center text-6xl flex justify-center">
        <div className={`py-2 hover:text-primaryDark cursor-pointer ${page === 0 ? "border-b-2 border-secondaryDark": "border-none"}`}>help</div>
        <div className="py-2 px-3">&</div>
        <div className={`py-2 hover:text-primaryDark cursor-pointer ${page === 1 ? "border-b-2 border-secondaryDark ": "border-none"}`}>about</div>
      </div>

      <div className="py-2 px-2 text-center w-1/2 mx-auto bg-white flex justify-center rounded-lg">
       
      </div>
    </div>
  );
};

export default Help;

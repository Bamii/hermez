import React from 'react';

const ClientHistoryEntry = ({ text }) => {
  return (
    <div className="py-5 flex">
      <div className="flex items-center justify-center mr-5">
        <div className="bg-primaryLighter rounded-full h-2 w-4"></div>
      </div>
      <div>{text}</div>
    </div>
  )
}

export default ClientHistoryEntry;

import React from 'react';

const DragToSend = () => {
  return (
    <div
      style={{ width: '250px', height: '250px' }}
      className="cursor-pointer border-2 hover:border-5 border-dashed border-secondary rounded-lg m-auto text-center flex justify-center items-center"
    >
      click on this box <br/>
      or <br/>
      drag and drop a file <br/> to send
    </div>
  )
}

export default DragToSend;

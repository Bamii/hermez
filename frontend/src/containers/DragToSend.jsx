import React from 'react';

const DragToSend = () => {
  return (
    <div
      style={{ width: '250px', height: '250px' }}
      className="border-2 border-dashed border-secondary rounded-lg m-auto text-center flex justify-center items-center"
    >
      drag and drop a file <br/> to send
    </div>
  )
}

export default DragToSend;

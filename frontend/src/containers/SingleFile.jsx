import React from 'react';

const SingleFile = ({ imgsrc, alt = "", fileName, fileSize, selected, onClick, index }) => {
  return (
    <div
      onClick={(e) => onClick(e, index)}
      className={`flex flex-col align-center justify-center
        w-40 p-4 m-3 cursor-pointer ${
          selected
          ? 'rounded-lg border border-secondary border-b-2'
          : ''}`
        }
      >
      <div className="w-12 my-3">
        <img src={imgsrc} alt={alt}/>
      </div>
      <div className="filename text-lg">{fileName}</div>
      <div className="size text-sm">{fileSize}</div>
    </div>
  );
};

export default SingleFile;

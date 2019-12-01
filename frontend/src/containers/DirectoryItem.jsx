import React from 'react';

const DirectoryItem = ({ symbol = "+", item, selectedNode, onClick, index }) => {
  return (
    <div
      onClick={(e) => onClick(e, index)}
      className={`py-3 text-xl flex cursor-pointer ${
        selectedNode
        ? 'border-r-8 border-primaryLight text-secondaryLight'
        : ''}`}
      >
      <div className="px-2 w-auto">{symbol}</div>
      <div className="pl-2 flex-grow">{item}</div>
    </div>
  )
}

export default DirectoryItem;


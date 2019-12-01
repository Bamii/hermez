import React from 'react';

const WidgetCard = ({ title, icon = "+", extras }) => {
  return (
    <div className={`my-8 flex flex-col bg-secondaryLight w-full h-auto rounded-lg ${extras ? extras : ''}`}>
      <div className="header py-4 px-8 text-xl flex justify-between">
        <div className="title">{title}</div>
        <div className="action">{icon}</div>
      </div>
    </div>
  );
};

export default WidgetCard;

import React from 'react';

const SectionTitle = ({ title }) => {
  return (
    <div className="section-title text-2xl">
      {title}
      <hr
        style={{ left: '-15px', top: '5px' }}
        className="relative w-10 border border-secondary" />
    </div>
  );
};

export default SectionTitle;

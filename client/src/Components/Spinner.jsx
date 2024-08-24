import React from 'react';

function Spinner() {
  return (
    <div className="flex justify-center items-center">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-green-500 border-solid"></div>
    </div>
  );
}

export default Spinner;

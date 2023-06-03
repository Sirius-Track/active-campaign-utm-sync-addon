import React from 'react';

export const Spinner = ({ msg = '' }) => {
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-4 h-screen">
        {msg && (
          <p className="text-center text-xl font-bold text-gray-700">{msg}</p>
        )}
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      </div>
    </>
  );
};

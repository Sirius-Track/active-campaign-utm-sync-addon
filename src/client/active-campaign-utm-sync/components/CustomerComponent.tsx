import React from 'react';

export const CustomerComponent = () => {
  return (
    <div className="links-section">
      <p className="mb-2 text-lg">
        Para usar essa ferramenta, você precisa ser um cliente da Agência.
      </p>
      <div className="flex justify-between">
        <a
          href="https://siriustrack.com.br/activeutmsync"
          className="bg-blue-400 hover:bg-blue-500 text-white font-medium py-2 px-4 rounded"
          target="_blank"
        >
          Saiba mais
        </a>
        <a
          href="https://siriustrack.com.br/assinar-activesync/"
          className="bg-blue-400 hover:bg-blue-500 text-white font-medium py-2 px-4 rounded"
          target="_blank"
        >
          Assinar agora
        </a>
      </div>
    </div>
  );
};

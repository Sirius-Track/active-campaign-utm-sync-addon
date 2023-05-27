import React from 'react';
import { Spinner } from './Spinner';

interface CredentialsActiveCampaign {
  url: string;
  apiToken: string;
}

interface ActiveCampaignCredentialsProps {
  credentialsActiveCampaign: CredentialsActiveCampaign;
  setCredentialsActiveCampaign: React.Dispatch<
    React.SetStateAction<CredentialsActiveCampaign>
  >;
  tokenErrorMessage: string;
  handleTestConnection: () => Promise<void>;
  isTestingConnection: boolean;
}

export const ActiveCampaignCredentials = ({
  isTestingConnection,
  tokenErrorMessage,
  handleTestConnection,
  credentialsActiveCampaign,
  setCredentialsActiveCampaign,
}: ActiveCampaignCredentialsProps) => {
  if (isTestingConnection) return <Spinner />;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Credencias de acesso api:</h2>

      <label htmlFor="url" className="block mb-2 font-bold text-gray-600">
        URL ActiveCampaign1:
      </label>

      <input
        type="text"
        id="url"
        name="url"
        value={credentialsActiveCampaign.url}
        onChange={(e) =>
          setCredentialsActiveCampaign((prev) => ({
            ...prev,
            url: e.target.value,
          }))
        }
        placeholder="https://youraccount.api-us1.com"
        className="w-full border border-gray-400 p-2 rounded mb-4"
      />

      <p className="error hidden" id="urlError">
        URL inválida
      </p>

      <label htmlFor="apiToken" className="block mb-2 font-bold text-gray-600">
        API Token:
      </label>

      <input
        type="text"
        id="apiToken"
        name="apiToken"
        value={credentialsActiveCampaign.apiToken}
        onChange={(e) =>
          setCredentialsActiveCampaign((prev) => ({
            ...prev,
            apiToken: e.target.value,
          }))
        }
        placeholder="Your API Token"
        className="w-full border border-gray-400 p-2 rounded mb-4"
      />

      {tokenErrorMessage && (
        <p className="error" id="tokenError">
          {tokenErrorMessage}
        </p>
      )}

      <button
        id="testConnectionButton"
        type="button"
        onClick={handleTestConnection}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Testar Conexão
      </button>
    </div>
  );
};

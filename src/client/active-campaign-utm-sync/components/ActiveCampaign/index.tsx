import React, { useEffect, useState } from 'react';

import {
  ActiveCampaignCredentials,
  CredentialsActiveCampaign,
} from './ActiveCampaignCredentials';
import {
  ActiveCampaignFieldsMapping,
  FetchedData,
  LocalCustomFields,
  fieldNames,
} from './ActiveCampaignFieldsMapping';
import { CustomerComponent } from './CustomerComponent';
import { serverFunctions } from '../../../utils/serverFunctions';

export const ActiveCampaign = () => {
  const [isCustomer, setIsCustomer] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isFetchingData, setIsFetchingData] = useState(false);
  const [isTestingConnection, setIsTestingConnection] = useState(false);
  const [isFinalizingMapping, setIsFinalizingMapping] = useState(false);
  const [showSuccessMessageText, setShowSuccessMessageText] = useState(false);
  const [tokenErrorMessage, setTokenErrorMessage] = useState('');
  const [credentials, setCredentials] = useState<CredentialsActiveCampaign>({
    url: '',
    apiToken: '',
  });
  const [fetchedData, setFetchedData] = useState<FetchedData>({
    customFields: [],
    headers: [],
    listLeads: [],
  });
  const [localCustomFields, setLocalCustomFields] = useState<LocalCustomFields>(
    {
      utm_source: '',
      utm_medium: '',
      utm_campaign: '',
      utm_term: '',
      utm_content: '',
      data_criacao: '',
    }
  );
  const [leadList, setLeadList] = useState('');
  const [emailColumn, setEmailColumn] = useState('0');

  const fetchData = async () => {
    if (!isConnected) return;

    setIsFetchingData(true);
    try {
      const {
        customFields = [],
        headers = [],
        listLeads = [],
      } = await serverFunctions.fetchData(
        credentials.url,
        credentials.apiToken
      );

      setLeadList(listLeads[0]?.id || '');

      fieldNames.forEach((fieldName) => {
        const optionId = customFields.find(
          (field: { title: string }) => field.title === fieldName
        )?.id;

        setLocalCustomFields((prev) => ({
          ...prev,
          [fieldName]: optionId || '',
        }));
      });

      const emailHeader = headers.find((header) =>
        header.toLowerCase().includes('mail')
      );

      if (emailHeader) setEmailColumn(headers.indexOf(emailHeader).toString());

      setFetchedData({ customFields, headers, listLeads });
      setIsFetchingData(false);
    } catch (error) {
      console.error('Erro ao inicializar listas:', error);
    }
  };

  const handleTestConnection = async () => {
    setIsTestingConnection(true);
    try {
      await serverFunctions.testConnection(
        credentials.url,
        credentials.apiToken
      );
      setIsConnected(true);
      setShowSuccessMessageText(true);
      setIsTestingConnection(false);
      setTimeout(() => setShowSuccessMessageText(false), 6000);
    } catch (error) {
      setTokenErrorMessage('Erro na conexão. Verifique sua URL e Token da API');
    }
  };

  const handleFinalizeClick = async () => {
    setIsFinalizingMapping(true);
    try {
      await serverFunctions.finalizeMapping({
        url: credentials.url,
        apiToken: credentials.apiToken,
        leadList,
        emailColumn,
        ...localCustomFields,
      });
      setIsFinalizingMapping(false);
    } catch (error) {
      console.log('Erro ao finalizar mapeamento:', error);
    }
  };

  const auth = async () => {
    if (isCustomer) return;
    const { isCustomer: customerIsCustomer } =
      await serverFunctions.isCustomer();
    setIsCustomer(customerIsCustomer);
  };

  useEffect(() => {
    auth();
    fetchData();
  }, [isConnected]);

  if (!isCustomer) return <CustomerComponent />;

  if (!isConnected)
    return (
      <ActiveCampaignCredentials
        isTestingConnection={isTestingConnection}
        tokenErrorMessage={tokenErrorMessage}
        credentialsActiveCampaign={credentials}
        handleTestConnection={handleTestConnection}
        setCredentialsActiveCampaign={setCredentials}
      />
    );

  return (
    <ActiveCampaignFieldsMapping
      leadList={leadList}
      fetchedData={fetchedData}
      emailColumn={emailColumn}
      isFetchingData={isFetchingData}
      localCustomFields={localCustomFields}
      isFinalizingMapping={isFinalizingMapping}
      showSuccessMessageText={showSuccessMessageText}
      setLeadList={setLeadList}
      setEmailColumn={setEmailColumn}
      setLocalCustomFields={setLocalCustomFields}
      handleFinalizeClick={handleFinalizeClick}
    />
  );
};

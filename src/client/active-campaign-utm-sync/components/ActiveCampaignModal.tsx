import React, { useEffect, useState } from 'react';

import { serverFunctions } from '../../utils/serverFunctions';
import { ActiveCampaignCredentials } from './ActiveCampaignCredentials';
import {
  ActiveCampaignFieldsMapping,
  fieldNames,
} from './ActiveCampaignFieldsMapping';
import { CustomerComponent } from './CustomerComponent';

interface FetchedData {
  customFields: any[];
  headers: string[];
  listLeads: any[];
}

interface LocalCustomFields {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_term: string;
  utm_content: string;
  data_criacao: string;
}

interface Credentials {
  url: string;
  apiToken: string;
}

export const ActiveCampaignModal = () => {
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
  const [credentialsActiveCampaign, setCredentialsActiveCampaign] =
    useState<Credentials>({
      url: '',
      apiToken: '',
    });
  const [isCustomer, setIsCustomer] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isFetchingData, setIsFetchingData] = useState(false);
  const [isTestingConnection, setIsTestingConnection] = useState(false);
  const [isFinalizingMapping, setIsFinalizingMapping] = useState(false);
  const [showSuccessMessageText, setShowSuccessMessageText] = useState(false);
  const [leadList, setLeadList] = useState('');
  const [emailColumn, setEmailColumn] = useState('0');
  const [tokenErrorMessage, setTokenErrorMessage] = useState('');

  const fetchData = async () => {
    if (!isConnected) return;

    setIsFetchingData(true);
    try {
      const result = await serverFunctions.fetchData(
        credentialsActiveCampaign.url,
        credentialsActiveCampaign.apiToken
      );

      const { customFields = [], headers = [], listLeads = [] } = result;

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

  const auth = async () => {
    if (isCustomer) return;
    const customer = await serverFunctions.isCustomer();
    if (customer.isCustomer) setIsCustomer(true);
  };

  const handleTestConnection = async () => {
    setIsTestingConnection(true);
    try {
      await serverFunctions.testConnection(
        credentialsActiveCampaign.url,
        credentialsActiveCampaign.apiToken
      );
      setIsConnected(true);
      setShowSuccessMessageText(true);
      setIsTestingConnection(false);
      setTimeout(() => setShowSuccessMessageText(false), 6000);
    } catch (error) {
      console.log(`Erro ao testar a conexão: ${error}`);
      setTokenErrorMessage('Erro na conexão. Verifique sua URL e Token da API');
    }
  };

  const handleFinalizeClick = async () => {
    setIsFinalizingMapping(true);
    try {
      await serverFunctions.finalizeMapping({
        url: credentialsActiveCampaign.url,
        apiToken: credentialsActiveCampaign.apiToken,
        leadList,
        emailColumn,
        ...localCustomFields,
      });
      setIsFinalizingMapping(false);
    } catch (error) {
      console.log('Erro ao finalizar mapeamento:', error);
    }
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
        credentialsActiveCampaign={credentialsActiveCampaign}
        handleTestConnection={handleTestConnection}
        setCredentialsActiveCampaign={setCredentialsActiveCampaign}
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

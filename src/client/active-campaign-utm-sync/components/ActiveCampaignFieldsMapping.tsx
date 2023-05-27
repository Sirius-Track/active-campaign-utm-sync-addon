import React from 'react';
import { FormField } from './FormField';
import { FieldColumns, FieldName } from './FieldColumns';
import { Spinner } from './Spinner';

interface FetchedData {
  customFields: {
    id: number;
    title: string;
  }[];
  headers: string[];
  listLeads: {
    id: string;
    name: string;
  }[];
}

interface LocalCustomFields {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_term: string;
  utm_content: string;
  data_criacao: string;
}

interface ActiveCampaignFormMappingProps {
  isFetchingData: boolean;
  isFinalizingMapping: boolean;
  showSuccessMessageText: boolean;
  leadList: string;
  fetchedData: FetchedData;
  setLeadList: React.Dispatch<React.SetStateAction<string>>;
  emailColumn: string;
  setEmailColumn: React.Dispatch<React.SetStateAction<string>>;
  localCustomFields: LocalCustomFields;
  setLocalCustomFields: React.Dispatch<React.SetStateAction<LocalCustomFields>>;
  handleFinalizeClick: () => Promise<void>;
}

export const fieldNames: FieldName[] = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
  'data_criacao',
];

export const ActiveCampaignFieldsMapping = ({
  isFetchingData,
  isFinalizingMapping,
  showSuccessMessageText,
  leadList,
  setLeadList,
  emailColumn,
  setEmailColumn,
  localCustomFields,
  setLocalCustomFields,
  handleFinalizeClick,
  fetchedData: { customFields, headers, listLeads },
}: ActiveCampaignFormMappingProps) => {
  if (isFetchingData || isFinalizingMapping) return <Spinner />;

  return (
    <div>
      {showSuccessMessageText && (
        <p id="successMessage" className="text-green-500 font-bold">
          <span>&#10003;</span> ActiveCampaign autenticado com sucesso!
        </p>
      )}
      <h3 className="text-xl font-bold mb-4">Mapeamento de campos:</h3>
      <p className="mb-4">Selecione os equivalentes aos titulos:</p>
      <FormField
        field="leadList"
        label="Lista de leads"
        value={leadList || listLeads[0]?.id}
        valuesToRender={listLeads.map((lead) => (
          <option value={lead.id} key={lead.id}>
            {lead.name}
          </option>
        ))}
        setValue={setLeadList}
      />
      <FormField
        field="emailColumn"
        label="Coluna de e-mail"
        value={emailColumn}
        valuesToRender={headers.map((header, index) => (
          <option value={index} key={index} selected={header.includes('mail')}>
            {header}
          </option>
        ))}
        setValue={setEmailColumn}
      />
      <FieldColumns
        fetchedCustomFields={customFields}
        fieldNames={fieldNames}
        localCustomFields={localCustomFields}
        setLocalCustomFields={setLocalCustomFields}
      />
      <button
        id="finalize"
        onClick={handleFinalizeClick}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Finalizar
      </button>
    </div>
  );
};

import { getSheetHeaders } from './sheets';

export const createCustomColumns = () => {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const headers = [
    'utm_campaign',
    'utm_source',
    'utm_medium',
    'utm_content',
    'utm_term',
    'data_criacao',
  ];

  const headersInSheet = getSheetHeaders();

  headers
    .filter((h) => !headersInSheet.includes(h))
    .forEach((header) => {
      const col = sheet.getRange(1, sheet.getLastColumn() + 1);
      col.setValue(header);
    });
};

export const getContactId = (
  apiUrl: string,
  apiToken: string,
  email: string
) => {
  const options = {
    method: 'GET',
    headers: {
      'Api-Token': apiToken,
    },
  };

  const response = UrlFetchApp.fetch(
    `${apiUrl}/api/3/contacts?email=${email}`,
    options
  );
  const json = JSON.parse(response.getContentText());

  if (json.contacts && json.contacts.length > 0) return json.contacts[0].id;

  return null;
};

const getCustomFieldValues = (
  apiUrl: string,
  apiToken: string,
  contactId: string
) => {
  const options = {
    method: 'GET',
    headers: {
      'Api-Token': apiToken,
    },
  };

  const response = UrlFetchApp.fetch(
    `${apiUrl}/api/3/contacts/${contactId}/fieldValues`,
    options
  );
  const json = JSON.parse(response.getContentText());

  if (json.fieldValues && json.fieldValues.length > 0) return json.fieldValues;
  else throw new Error('No custom fields found for contact id ' + contactId);
};

export const getSheetColumnValues = ({
  apiToken,
  apiUrl,
  contactId,
  scriptProperties,
}: {
  apiUrl: string;
  apiToken: string;
  contactId: string;
  scriptProperties: GoogleAppsScript.Properties.Properties;
}) => {
  const fieldValues = getCustomFieldValues(apiUrl, apiToken, contactId);

  try {
    const savedFields = scriptProperties.getProperties();
    const customColumnKeys = Object.keys(savedFields).filter((key) =>
      /utm|data/gi.test(key)
    );

    return customColumnKeys.map((customColumnKey) => {
      const fieldId = savedFields[customColumnKey];

      const fieldValue = fieldValues.find((fieldValue) => {
        return fieldValue.field === fieldId;
      });

      return {
        fieldName: customColumnKey,
        fieldValue: fieldValue ? fieldValue.value : '',
      };
    });
  } catch (error) {
    console.log('Erro ao buscar os UTMs:', error);
    return [];
  }
};

export const getActiveCampaignData = () => {
  const scriptProperties = PropertiesService.getScriptProperties();
  const apiUrl = scriptProperties.getProperty('url');
  const apiToken = scriptProperties.getProperty('apiToken');
  const emailColumn = scriptProperties.getProperty('emailColumn');

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getActiveSheet();
  const data = sheet.getDataRange().getValues().slice(1);
  const headers = getSheetHeaders();

  for (let i = 0; i < data.length; i++) {
    const email = data[i][emailColumn];
    const contactId = getContactId(apiUrl, apiToken, email);

    if (!contactId) continue;

    const customColumnFieldValues = getSheetColumnValues({
      apiUrl,
      apiToken,
      contactId,
      scriptProperties,
    });

    customColumnFieldValues.forEach((customColumnFieldValue) => {
      const columnIndex = headers.indexOf(customColumnFieldValue.fieldName);
      const columnValue = customColumnFieldValue.fieldValue;

      if (columnIndex > -1)
        sheet.getRange(i + 2, columnIndex + 1).setValue(columnValue);
    });
  }
};

const getCustomFields = (apiUrl: string, apiToken: string) => {
  const options = {
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Api-Token': apiToken,
    },
  };

  try {
    const response = UrlFetchApp.fetch(
      apiUrl + '/api/3/fields?limit=100',
      options
    );
    const fieldsData = JSON.parse(response.getContentText());
    return fieldsData.fields;
  } catch (error) {
    console.log('Erro ao buscar os campos personalizados:', error);
    return [];
  }
};

const getLists = (apiUrl: string, apiToken: string) => {
  const options = {
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Api-Token': apiToken,
    },
  };

  try {
    const response = UrlFetchApp.fetch(
      apiUrl + '/api/3/lists?limit=100',
      options
    );

    const listsData = JSON.parse(response.getContentText());
    return listsData.lists;
  } catch (error) {
    console.log('Erro ao buscar as listas:', error);
    return [];
  }
};

export const fetchData = (url: string, apiToken: string) => {
  const headers = getSheetHeaders();
  const customFields = getCustomFields(url, apiToken);
  const listLeads = getLists(url, apiToken);

  return {
    headers,
    customFields,
    listLeads,
  };
};

export const testConnection = (url: string, apiToken: string) => {
  const options = {
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Api-Token': apiToken,
    },
  };
  const response = UrlFetchApp.fetch(url + '/api/3/contacts', options);
  return response.getResponseCode() === 200;
};

export const finalizeMapping = (formData: { [x: string]: string }) => {
  const scriptProperties = PropertiesService.getScriptProperties();

  const fields = [
    'utm_campaign',
    'utm_source',
    'utm_medium',
    'utm_content',
    'utm_term',
    'data_criacao',
    'emailColumn',
    'leadList',
    'apiToken',
    'url',
  ];

  fields.forEach((utmField) => {
    scriptProperties.setProperty(utmField, formData[utmField]);
  });

  createCustomColumns();
  getActiveCampaignData();

  ScriptApp.newTrigger('onFormSubmit')
    .forSpreadsheet(SpreadsheetApp.getActiveSpreadsheet())
    .onFormSubmit()
    .create();

  const htmlOutput = HtmlService.createHtmlOutput(
    '<p>Configuração concluída com sucesso.</p>'
  )
    .setWidth(300)
    .setHeight(100);

  SpreadsheetApp.getUi().showModalDialog(htmlOutput, 'Concluído');
};

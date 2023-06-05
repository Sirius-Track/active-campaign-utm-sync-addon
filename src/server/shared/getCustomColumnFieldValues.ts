import { getApiUrlAndToken } from './getApiUrlAndToken';
import { getContactInfo } from './getContactId';
import { fetchSheetCustomFieldValues } from './fetchSheetCustomFieldValues';

export const getCustomColumnFieldValues = (email, scriptProperties) => {
  const { apiUrl, apiToken } = getApiUrlAndToken();

  const contactInfo = getContactInfo(apiUrl, apiToken, email);

  if (!contactInfo) return [];

  const sheetCustomFieldValues = fetchSheetCustomFieldValues({
    apiUrl,
    apiToken,
    contactId: contactInfo.id,
    scriptProperties,
  });

  return [
    ...sheetCustomFieldValues,
    { fieldName: 'cdate', fieldValue: contactInfo.cdate },
    { fieldName: 'udate', fieldValue: contactInfo.udate },
  ];
};

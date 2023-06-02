import { getContactId, getSheetColumnValues } from '../active-campaign';
import { getApiUrlAndToken } from './getApiUrlAndToken';

export const getCustomColumnFieldValues = (email, scriptProperties) => {
  const { apiUrl, apiToken } = getApiUrlAndToken();

  const contactId = getContactId(apiUrl, apiToken, email);

  if (!contactId) return [];

  return getSheetColumnValues({
    apiUrl,
    apiToken,
    contactId,
    scriptProperties,
  });
};

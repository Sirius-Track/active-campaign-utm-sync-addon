import { getApiUrlAndToken } from './getApiUrlAndToken';
import { getContactId } from './getContactId';
import { fetchSheetCustomFieldValues } from './fetchSheetCustomFieldValues';

export const getCustomColumnFieldValues = (email, scriptProperties) => {
  const { apiUrl, apiToken } = getApiUrlAndToken();

  const contactId = getContactId(apiUrl, apiToken, email);

  if (!contactId) return [];

  return fetchSheetCustomFieldValues({
    apiUrl,
    apiToken,
    contactId,
    scriptProperties,
  });
};

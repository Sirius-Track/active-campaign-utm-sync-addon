import { getApiUrlAndToken } from './getApiUrlAndToken';
import { getContactInfo } from './getContactId';
import { fetchSheetCustomFieldValues } from './fetchSheetCustomFieldValues';

export const getCustomColumnFieldValues = (email, scriptProperties) => {
  const { apiUrl, apiToken } = getApiUrlAndToken();

  const contactInfo = getContactInfo(apiUrl, apiToken, email);

  const EMAIL_NOT_FOUND_MSG = 'EMAIL_NOT_FOUND_ACTIVE_CAMPAIGN';
  if (!contactInfo)
    return [
      { fieldName: 'cdate', fieldValue: EMAIL_NOT_FOUND_MSG },
      { fieldName: 'udate', fieldValue: EMAIL_NOT_FOUND_MSG },
      {
        fieldName: 'utm_campaign',
        fieldValue: EMAIL_NOT_FOUND_MSG,
      },
      {
        fieldName: 'utm_source',
        fieldValue: EMAIL_NOT_FOUND_MSG,
      },
      {
        fieldName: 'utm_medium',
        fieldValue: EMAIL_NOT_FOUND_MSG,
      },
      {
        fieldName: 'utm_content',
        fieldValue: EMAIL_NOT_FOUND_MSG,
      },
      { fieldName: 'utm_term', fieldValue: EMAIL_NOT_FOUND_MSG },
    ];

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

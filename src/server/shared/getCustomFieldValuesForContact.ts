export const getCustomFieldValuesForContact = (
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

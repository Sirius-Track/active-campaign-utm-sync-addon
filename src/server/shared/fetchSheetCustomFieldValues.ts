import { getCustomFieldValuesForContact } from './getCustomFieldValuesForContact';

export const fetchSheetCustomFieldValues = ({
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
  const fieldValues = getCustomFieldValuesForContact(
    apiUrl,
    apiToken,
    contactId
  );

  try {
    const savedFields = scriptProperties.getProperties();
    const customColumnKeys = Object.keys(savedFields).filter((key) =>
      /utm|data/gi.test(key)
    );

    return customColumnKeys.map((customColumnKey) => {
      const fieldId = savedFields[customColumnKey];

      const fieldValue = fieldValues.find(
        (fieldValue) => fieldValue.field === fieldId
      );

      return {
        fieldName: customColumnKey,
        fieldValue: fieldValue ? fieldValue.value : 'Empty',
      };
    });
  } catch (error) {
    console.log('Erro ao buscar os UTMs:', error);
    return [];
  }
};

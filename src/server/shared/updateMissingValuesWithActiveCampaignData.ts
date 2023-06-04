import { getCustomColumnFieldValues } from './getCustomColumnFieldValues';
import { getSheetHeaders } from './getSheetHeaders';

export const updateMissingValuesWithActiveCampaignData = () => {
  const scriptProperties = PropertiesService.getScriptProperties();
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getActiveSheet();
  const headers = getSheetHeaders();

  const lastRow = sheet.getLastRow();
  const emailColumnIndex = headers.indexOf(
    scriptProperties.getProperty('emailColumn')
  );

  for (let i = 2; i <= lastRow; i++) {
    const row = sheet.getRange(i, 1, 1, headers.length).getValues()[0];
    const hasMissingValue = row.some((value) => value === '');

    if (hasMissingValue) {
      const email = row[emailColumnIndex];

      const customColumnFieldValues = getCustomColumnFieldValues(
        email,
        scriptProperties
      );

      customColumnFieldValues.forEach((customColumnFieldValue) => {
        const columnIndex = headers.indexOf(customColumnFieldValue.fieldName);

        const columnValue = customColumnFieldValue.fieldValue;

        if (columnIndex > -1)
          sheet.getRange(i, columnIndex + 1).setValue(columnValue);
      });
    }
  }
};

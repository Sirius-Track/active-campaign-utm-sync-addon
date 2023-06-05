import { getSheetHeaders } from '../../shared/getSheetHeaders';
import { getCustomColumnFieldValues } from '../../shared/getCustomColumnFieldValues';

export const getCustomColumnFieldsToLastRow = (
  scriptProperties: GoogleAppsScript.Properties.Properties
) => {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getActiveSheet();
  const emailColumn = scriptProperties.getProperty('emailColumn');

  const lastRow = sheet.getLastRow();
  const email = sheet.getRange(lastRow, Number(emailColumn) + 1).getValue();

  const customColumnFieldValues = getCustomColumnFieldValues(
    email,
    scriptProperties
  );

  const headers = getSheetHeaders();

  customColumnFieldValues.forEach((customColumnFieldValue) => {
    const columnIndex = headers.indexOf(customColumnFieldValue.fieldName);
    const columnValue = customColumnFieldValue.fieldValue;
    if (columnIndex > -1)
      sheet.getRange(lastRow, columnIndex + 1).setValue(columnValue);
  });
};

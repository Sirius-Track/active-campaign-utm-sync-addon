import { getSheetHeaders } from '../sheets';
import { getCustomColumnFieldValues } from './getCustomColumnFieldValues';

export const getCustomColumnFieldsToLastRow = (
  scriptProperties: GoogleAppsScript.Properties.Properties
) => {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getActiveSheet();
  const headers = getSheetHeaders();

  const rows = sheet.getDataRange().getValues();
  const lastRow = sheet.getLastRow();
  const email =
    rows[rows.length - 1][scriptProperties.getProperty('emailColumn')];

  const customColumnFieldValues = getCustomColumnFieldValues(
    email,
    scriptProperties
  );

  customColumnFieldValues.forEach((customColumnFieldValue) => {
    const columnIndex = headers.indexOf(customColumnFieldValue.fieldName);
    const columnValue = customColumnFieldValue.fieldValue;
    if (columnIndex > -1)
      sheet.getRange(lastRow, columnIndex + 1).setValue(columnValue);
  });
};

import { getCustomColumnFieldValues } from './getCustomColumnFieldValues';
import { getSheetHeaders } from './getSheetHeaders';

export const updateMissingValuesWithActiveCampaignData = () => {
  const scriptProperties = PropertiesService.getScriptProperties();
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getActiveSheet();
  const headers = getSheetHeaders();

  const rows = sheet.getDataRange().getValues().slice(1);
  const rowsWithMissingValues = [];

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const hasMissingValue = row.some((value) => value === '');
    if (hasMissingValue) rowsWithMissingValues.push({ row, index: i });
  }

  rowsWithMissingValues.forEach(({ row, index }) => {
    const email = row[scriptProperties.getProperty('emailColumn')];
    const customColumnFieldValues = getCustomColumnFieldValues(
      email,
      scriptProperties
    );

    customColumnFieldValues.forEach((customColumnFieldValue) => {
      const columnIndex = headers.indexOf(customColumnFieldValue.fieldName);

      const columnValue = customColumnFieldValue.fieldValue;

      if (columnIndex > -1)
        sheet.getRange(index + 2, columnIndex + 1).setValue(columnValue);
    });
  });
};

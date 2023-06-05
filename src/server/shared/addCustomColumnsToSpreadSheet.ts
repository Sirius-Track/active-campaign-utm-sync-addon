import { getSheetHeaders } from './getSheetHeaders';

export const addCustomColumnsToSpreadSheet = () => {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const headers = [
    'utm_campaign',
    'utm_source',
    'utm_medium',
    'utm_content',
    'utm_term',
    'cdate',
    'udate',
  ];

  const headersInSheet = getSheetHeaders();

  headers
    .filter((h) => !headersInSheet.includes(h))
    .forEach((header) => {
      const col = sheet.getRange(1, sheet.getLastColumn() + 1);
      col.setValue(header);
    });
};

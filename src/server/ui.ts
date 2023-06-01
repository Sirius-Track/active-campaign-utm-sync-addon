import { getContactId, getSheetColumnValues } from './active-campaign';
import { getSheetHeaders } from './sheets';

const expirationDateAlert = (UI: GoogleAppsScript.Base.Ui) => {
  UI.alert(
    'Seu período de uso acabo, renove a compra ou entre em contato com o suporte.'
  );
};

const getUTMParams = (
  scriptProperties: GoogleAppsScript.Properties.Properties
) => {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getActiveSheet();
  const emailColumn = scriptProperties.getProperty('emailColumn');
  const apiUrl = scriptProperties.getProperty('url');
  const apiToken = scriptProperties.getProperty('apiToken');
  const headers = getSheetHeaders();

  const lastRow = sheet.getLastRow();
  const rows = sheet.getDataRange().getValues();
  const email = rows[rows.length - 1][emailColumn];

  const contactId = getContactId(apiUrl, apiToken, email);

  if (!contactId) return;

  const customColumnFieldValues = getSheetColumnValues({
    apiUrl,
    apiToken,
    contactId,
    scriptProperties,
  });

  customColumnFieldValues.forEach((customColumnFieldValue) => {
    const columnIndex = headers.indexOf(customColumnFieldValue.fieldName);
    const columnValue = customColumnFieldValue.fieldValue;
    if (columnIndex > -1)
      sheet.getRange(lastRow, columnIndex + 1).setValue(columnValue);
  });
};

const isExpired = (
  UI: GoogleAppsScript.Base.Ui,
  scriptProperties: GoogleAppsScript.Properties.Properties
) => {
  const expiration_date = new Date(
    scriptProperties.getProperty('expiration_date')
  );

  const today = new Date();

  if (expiration_date < today) {
    scriptProperties.setProperty('is_expired', 'true');

    expirationDateAlert(UI);
    return true;
  }

  return false;
};

export const onOpen = () => {
  const UI = SpreadsheetApp.getUi();

  const menu = UI.createMenu('ActiveCampaign UTM Sync').addItem(
    'Configure ActiveCampaign',
    'openDialogActiveCampaign'
  );

  menu.addToUi();

  const scriptProperties = PropertiesService.getScriptProperties();

  if (scriptProperties.getProperty('url')) {
    if (scriptProperties.getProperty('is_expired'))
      return expirationDateAlert(UI);

    if (!isExpired(UI, scriptProperties)) getUTMParams(scriptProperties);
  }
};

export const onFormSubmit = () => {
  const UI = SpreadsheetApp.getUi();
  const scriptProperties = PropertiesService.getScriptProperties();

  if (!isExpired(UI, scriptProperties)) getUTMParams(scriptProperties);
};

export const openDialogActiveCampaign = () => {
  const html = HtmlService.createHtmlOutputFromFile('active-campaign-utm-sync')
    .setWidth(500)
    .setHeight(400);
  SpreadsheetApp.getUi().showModalDialog(html, 'ActiveCampaign UTM Sync');
};

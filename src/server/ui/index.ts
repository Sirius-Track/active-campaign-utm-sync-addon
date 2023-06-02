import { addCustomColumnsToSpreadSheet } from '../shared/addCustomColumnsToSpreadSheet';
import { isCustomer } from '../shared/isCustomer';
import { getCustomColumnFieldsToLastRow } from './shared/getCustomColumnFieldsToLastRow';

export const onOpen = () => {
  const menu = SpreadsheetApp.getUi()
    .createMenu('ActiveCampaign UTM Sync')
    .addItem('Configure ActiveCampaign', 'openDialogActiveCampaign');

  const scriptProperties = PropertiesService.getScriptProperties();

  if (scriptProperties.getProperty('url'))
    menu.addItem('Sync ActiveCampaign', 'syncActiveCampaign');

  menu.addToUi();
};

export const onFormSubmit = () => {
  const scriptProperties = PropertiesService.getScriptProperties();

  if (scriptProperties.getProperty('url')) {
    const { isCustomer: allowed } = isCustomer();

    if (!allowed) return;

    addCustomColumnsToSpreadSheet();

    getCustomColumnFieldsToLastRow(scriptProperties);
  }
};

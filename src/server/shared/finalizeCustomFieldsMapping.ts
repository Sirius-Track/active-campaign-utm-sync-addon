import { addCustomColumnsToSpreadSheet } from './addCustomColumnsToSpreadSheet';
import { updateMissingValuesWithActiveCampaignData } from './updateMissingValuesWithActiveCampaignData';

export const finalizeCustomFieldsMapping = (formData: {
  [x: string]: string;
}) => {
  const scriptProperties = PropertiesService.getScriptProperties();

  const fields = [
    'utm_campaign',
    'utm_source',
    'utm_medium',
    'utm_content',
    'utm_term',
    'emailColumn',
    'leadList',
    'apiToken',
    'url',
  ];

  fields.forEach((utmField) => {
    scriptProperties.setProperty(utmField, formData[utmField]);
  });

  addCustomColumnsToSpreadSheet();

  updateMissingValuesWithActiveCampaignData();

  ScriptApp.newTrigger('onFormSubmit')
    .forSpreadsheet(SpreadsheetApp.getActiveSpreadsheet())
    .onFormSubmit()
    .create();

  const htmlOutput = HtmlService.createHtmlOutput(
    '<p>Configuração concluída com sucesso.</p>'
  )
    .setWidth(300)
    .setHeight(100);

  SpreadsheetApp.getUi().showModalDialog(htmlOutput, 'Concluído');
};

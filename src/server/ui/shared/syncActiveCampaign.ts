import { addCustomColumnsToSpreadSheet } from '../../shared/addCustomColumnsToSpreadSheet';
import { updateMissingValuesWithActiveCampaignData } from '../../shared/updateMissingValuesWithActiveCampaignData';
import { isCustomer } from '../../shared/isCustomer';

export const syncActiveCampaign = () => {
  const scriptProperties = PropertiesService.getScriptProperties();

  if (scriptProperties.getProperty('url')) {
    const { isCustomer: allowed } = isCustomer();

    if (!allowed) {
      SpreadsheetApp.getUi().alert(
        'Seu período de uso acabou, renove a compra ou entre em contato com o suporte.'
      );
      return;
    }

    addCustomColumnsToSpreadSheet();

    updateMissingValuesWithActiveCampaignData();

    SpreadsheetApp.getUi().alert('Sincronização concluída com sucesso.');
  }
};

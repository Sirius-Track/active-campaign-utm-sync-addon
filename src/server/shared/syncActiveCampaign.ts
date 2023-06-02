import { createCustomColumns, getActiveCampaignData } from '../active-campaign';
import { isCustomer } from '../isCustomer';

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

    createCustomColumns();

    getActiveCampaignData();
  }
};

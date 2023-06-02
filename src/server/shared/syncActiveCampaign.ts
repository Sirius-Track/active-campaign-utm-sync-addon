import { createCustomColumns, getActiveCampaignData } from '../active-campaign';
import { isCustomer } from '../isCustomer';
import { expirationDateAlert } from './expirationDateAlert';

export const syncActiveCampaign = () => {
  const scriptProperties = PropertiesService.getScriptProperties();

  if (scriptProperties.getProperty('url')) {
    const { isCustomer: allowed } = isCustomer();

    if (!allowed) return expirationDateAlert();

    createCustomColumns();

    getActiveCampaignData();
  }
};

import { getActiveCampaignLeadList } from './getActiveCampaignLeadList';
import { getCustomFields } from './getCustomFields';
import { getSheetHeaders } from './getSheetHeaders';

export const fetchDataToPopulate = (url: string, apiToken: string) => {
  const sheetHeaders = getSheetHeaders();
  const activeCustomFields = getCustomFields(url, apiToken);
  const leadList = getActiveCampaignLeadList(url, apiToken);

  return {
    sheetHeaders,
    activeCustomFields,
    leadList,
  };
};

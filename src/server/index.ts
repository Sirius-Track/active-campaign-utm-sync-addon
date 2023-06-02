import { fetchData, finalizeMapping, testConnection } from './active-campaign';
import { isCustomer } from './isCustomer';
import { openDialogActiveCampaign } from './shared/openDialogActiveCampaign';
import { syncActiveCampaign } from './shared/syncActiveCampaign';
import { getSheetHeaders } from './sheets';
import { onFormSubmit, onOpen } from './ui';

// Public functions must be exported as named exports
export {
  onOpen,
  onFormSubmit,
  fetchData,
  finalizeMapping,
  getSheetHeaders,
  isCustomer,
  openDialogActiveCampaign,
  syncActiveCampaign,
  testConnection,
};

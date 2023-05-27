import { fetchData, finalizeMapping, testConnection } from './active-campaign';
import { isCustomer } from './customer';
import { getSheetHeaders } from './sheets';
import { onFormSubmit, onOpen, openDialogActiveCampaign } from './ui';

// Public functions must be exported as named exports
export {
  fetchData,
  finalizeMapping,
  getSheetHeaders,
  isCustomer,
  onFormSubmit,
  onOpen,
  openDialogActiveCampaign,
  testConnection,
};

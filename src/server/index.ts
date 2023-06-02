import { isCustomer } from './shared/isCustomer';
import { openDialogActiveCampaign } from './ui/shared/openDialogActiveCampaign';
import { syncActiveCampaign } from './ui/shared/syncActiveCampaign';
import { getSheetHeaders } from './shared/getSheetHeaders';
import { onFormSubmit, onOpen } from './ui';
import { fetchDataToPopulate } from './shared/fetchDataToPopulate';
import { testConnection } from './shared/testConnection';
import { finalizeCustomFieldsMapping } from './shared/finalizeCustomFieldsMapping';

// Public functions must be exported as named exports
export {
  onOpen,
  onFormSubmit,
  fetchDataToPopulate,
  finalizeCustomFieldsMapping,
  getSheetHeaders,
  isCustomer,
  openDialogActiveCampaign,
  syncActiveCampaign,
  testConnection,
};

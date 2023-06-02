export const openDialogActiveCampaign = () => {
  const html = HtmlService.createHtmlOutputFromFile('active-campaign-utm-sync')
    .setWidth(500)
    .setHeight(400);

  SpreadsheetApp.getUi().showModalDialog(html, 'ActiveCampaign UTM Sync');
};

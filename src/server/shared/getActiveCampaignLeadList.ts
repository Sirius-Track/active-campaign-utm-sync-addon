export const getActiveCampaignLeadList = (apiUrl: string, apiToken: string) => {
  const options = {
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Api-Token': apiToken,
    },
  };

  try {
    const response = UrlFetchApp.fetch(
      apiUrl + '/api/3/lists?limit=100',
      options
    );

    const listsData = JSON.parse(response.getContentText());
    return listsData.lists;
  } catch (error) {
    console.log('Erro ao buscar as listas:', error);
    return [];
  }
};

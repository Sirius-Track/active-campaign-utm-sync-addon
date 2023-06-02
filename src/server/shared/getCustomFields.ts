export const getCustomFields = (apiUrl: string, apiToken: string) => {
  const options = {
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Api-Token': apiToken,
    },
  };

  try {
    const response = UrlFetchApp.fetch(
      apiUrl + '/api/3/fields?limit=100',
      options
    );
    const fieldsData = JSON.parse(response.getContentText());
    return fieldsData.fields;
  } catch (error) {
    console.log('Erro ao buscar os campos personalizados:', error);
    return [];
  }
};

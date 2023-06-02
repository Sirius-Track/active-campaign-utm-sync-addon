export const testConnection = (url: string, apiToken: string) => {
  const options = {
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Api-Token': apiToken,
    },
  };
  const response = UrlFetchApp.fetch(url + '/api/3/contacts', options);
  return response.getResponseCode() === 200;
};

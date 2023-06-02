export const getApiUrlAndToken = () => {
  const scriptProperties = PropertiesService.getScriptProperties();
  return {
    apiUrl: scriptProperties.getProperty('url'),
    apiToken: scriptProperties.getProperty('apiToken'),
  };
};

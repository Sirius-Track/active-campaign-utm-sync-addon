import { getActiveCampaignData } from './active-campaign';

export const isCustomer = () => {
  const email = Session.getActiveUser().getEmail();
  const scriptProperties = PropertiesService.getScriptProperties();

  const options = {
    method: 'POST',
    payload: {
      email,
    },
  };

  try {
    const response = UrlFetchApp.fetch(
      `https://api.siriustrack.com.br/active_campaign_sync/getCustomer`,
      options
    );

    const json = JSON.parse(response.getContentText());

    if (response.getResponseCode() !== 200)
      return {
        message: json.message || json.errors,
        isCustomer: false,
      };

    const expirationDate =
      new Date(json.customer.expiration_date).getTime() - Date.now();

    if (expirationDate <= 0) {
      scriptProperties.setProperty('is_expired', 'true');
      return {
        message:
          'Seu período de uso acabo, renove a compra ou entre em contato com o suporte.',
        isCustomer: false,
      };
    }

    if (
      scriptProperties.getProperty('expiration_date') &&
      scriptProperties.getProperty('is_expired')
    ) {
      getActiveCampaignData();
      scriptProperties.deleteProperty('is_expired');
    }

    scriptProperties.setProperty(
      'expiration_date',
      json.customer.expiration_date
    );

    return {
      message: 'Usuário autenticado com sucesso.',
      isCustomer: true,
    };
  } catch (error) {
    console.error(error);
    return {
      message: 'Erro ao autenticar usuário.',
      isCustomer: false,
    };
  }
};

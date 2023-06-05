export const getContactInfo = (
  apiUrl: string,
  apiToken: string,
  email: string
) => {
  try {
    const options = {
      method: 'GET',
      headers: {
        'Api-Token': apiToken,
      },
    };

    const response = UrlFetchApp.fetch(
      `${apiUrl}/api/3/contacts?email=${email}`,
      options
    );
    const json = JSON.parse(response.getContentText());

    if (json.contacts && json.contacts.length > 0)
      return {
        id: json.contacts[0].id,
        cdate: json.contacts[0].cdate,
        udate: json.contacts[0].udate,
      };

    return null;
  } catch (error) {
    return null;
  }
};

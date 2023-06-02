export const expirationDateAlert = () => {
  SpreadsheetApp.getUi().alert(
    'Seu período de uso acabou, renove a compra ou entre em contato com o suporte.'
  );
};

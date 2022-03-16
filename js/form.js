const initializeFormValues = () => {
  const id = new URLSearchParams(window.location.search).get('id');
  const headerElement = document.getElementById('header');
  const formElement = document.getElementById('invoice-form');
  if (!id) {
    headerElement.innerText = 'Nowa faktura';
    showElement(formElement);
    return;
  }

  headerElement.innerText = 'Modyfikacja faktury';
  const loadingAnimationElement = document.getElementById('loading-animation');
  showElement(loadingAnimationElement);

  getInvoice(id)
    .then(data => {
      const subheaderElement = document.getElementById('subheader');
      subheaderElement.innerText = `Numer faktury: ${data['number']}`;
      showElement(formElement);
    })
    .catch(error => {
      const errorMessageElement = document.getElementById('error-message');
      showElement(errorMessageElement);
    })
    .finally(() => {
      hideElement(loadingAnimationElement);
    });
};

initializeFormValues();

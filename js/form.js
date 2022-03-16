const initializeFormValues = () => {
  const id = new URLSearchParams(window.location.search).get('id');

  const headerElement = document.getElementById('header');
  const subheaderElement = document.getElementById('subheader');
  const loadingAnimationElement = document.getElementById('loading-animation');
  const formElement = document.getElementById('invoice-form');
  const errorMessageElement = document.getElementById('error-message');

  if (!id) {
    headerElement.innerText = 'Nowa faktura';
    showElement(formElement);
    return;
  }

  headerElement.innerText = 'Modyfikacja faktury';
  showElement(loadingAnimationElement);

  getInvoice(id)
    .then(data => {
      subheaderElement.innerText = `Numer faktury: ${data['number']}`;
      showElement(formElement);
    })
    .catch(error => {
      showElement(errorMessageElement);
    })
    .finally(() => {
      hideElement(loadingAnimationElement);
    });
};

initializeFormValues();

const initializeFormValues = () => {
  const id = new URLSearchParams(window.location.search).get('id');
  const headerElement = document.getElementById('header');
  if (!id) {
    headerElement.innerText = 'Nowa faktura';
    const formElement = document.getElementById('invoice-form');
    formElement.classList.remove('d-none');
    return;
  }

  headerElement.innerText = 'Modyfikacja faktury';
  const loadingAnimationElement = document.getElementById('loading-animation');
  loadingAnimationElement.classList.remove('d-none');

  getInvoice(id)
    .then(data => {
      const subheaderElement = document.getElementById('subheader');
      subheaderElement.innerText = `Numer faktury: ${data['number']}`;

    })
    .catch(error => {
      const errorMessageElement = document.getElementById('error-message');
      errorMessageElement.classList.remove('d-none');
    })
    .finally(() => {
      loadingAnimationElement.classList.add('d-none');
    });
};

initializeFormValues();

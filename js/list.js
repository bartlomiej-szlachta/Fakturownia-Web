const navigateToFormAddMode = () => {
  window.location.href = 'form.html';
};

const navigateToFormEditMode = (id) => {
  window.location.href = `form.html?id=${id}`;
};

const addInvoiceListItem = (invoiceData) => {
  const listElement = document.getElementById('invoices-list');

  const editInvoiceButtonId = `button-edit-invoice--${invoiceData.id}`;
  const liElement = document.createElement('li');
  liElement.innerHTML = `
    <button id="${editInvoiceButtonId}">
      Edytuj
    </button>
  `;
  listElement.appendChild(liElement);

  document.getElementById(editInvoiceButtonId)
    .addEventListener('click', () => navigateToFormEditMode(invoiceData.id));
};

const initializeInvoicesList = () => {
  const loadingAnimationElement = document.getElementById('loading-animation');
  const errorMessageElement = document.getElementById('error-message');

  showElement(loadingAnimationElement);

  getAllInvoices()
    .then((data) => {
      data.forEach(addInvoiceListItem);
    })
    .catch(error => {
      showElement(errorMessageElement);
    })
    .finally(() => {
      hideElement(loadingAnimationElement);
    });
};

initializeInvoicesList();

document.getElementById('button-add-invoice').addEventListener('click', navigateToFormAddMode);

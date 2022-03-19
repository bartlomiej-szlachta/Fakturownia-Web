const BUTTON_EDIT_INVOICE_CLASS_NAME = 'button-edit-invoice';
const BUTTON_DELETE_INVOICE_CLASS_NAME = 'button-delete-invoice';

const navigateToFormAddMode = () => {
  window.location.href = 'form.html';
};

const navigateToFormEditMode = (id) => {
  window.location.href = `form.html?id=${id}`;
};

const disableAllFields = () => {
  document.querySelectorAll(`.${BUTTON_DELETE_INVOICE_CLASS_NAME}`).forEach((button) => {
    button.disabled = true;
  });
};

const enableAllFields = () => {
  document.querySelectorAll(`.${BUTTON_DELETE_INVOICE_CLASS_NAME}`).forEach((button) => {
    button.disabled = false;
  });
};

const requestDeleteInvoice = (id) => {
  const loadingAnimationElement = document.getElementById('loading-animation');
  const errorMessageElement = document.getElementById('error-message');

  disableAllFields();
  showElement(loadingAnimationElement);
  hideElement(errorMessageElement);

  deleteInvoice(id)
    .then(result => {
      document.getElementById(id).remove();
    })
    .catch(result => {
      showElement(errorMessageElement);
    })
    .finally(() => {
      enableAllFields();
      hideElement(loadingAnimationElement);
    });
};

const addInvoiceListItem = (invoiceData) => {
  const listElement = document.getElementById('invoices-list');

  const editInvoiceButtonId = `${BUTTON_EDIT_INVOICE_CLASS_NAME}--${invoiceData.id}`;
  const deleteInvoiceButtonId = `${BUTTON_DELETE_INVOICE_CLASS_NAME}--${invoiceData.id}`;
  const liElement = document.createElement('li');
  liElement.id = invoiceData.id;
  liElement.innerHTML = `
    <div class="container-fluid">
      <div class="row">
        <div class="col-12 col-sm-8">
          <h6>
            Faktura numer ${invoiceData['number']}
          </h6>
          <p>
            Sprzedawca: ${invoiceData['seller_name']}
            <br />
            Nabywca: ${invoiceData['buyer_name']}
          </p>
        </div>
        <div class="col-12 col-sm-4 d-flex justify-content-center align-items-center">
          <button id="${editInvoiceButtonId}" class="${BUTTON_EDIT_INVOICE_CLASS_NAME}">
            Edytuj
          </button>
          <button id="${deleteInvoiceButtonId}" class="${BUTTON_DELETE_INVOICE_CLASS_NAME}">
            Usuń
          </button>
        </div>
      </div>
    </div>
  `;
  listElement.appendChild(liElement);

  document.getElementById(editInvoiceButtonId)
    .addEventListener('click', () => navigateToFormEditMode(invoiceData.id));

  document.getElementById(deleteInvoiceButtonId)
    .addEventListener('click', () => requestDeleteInvoice(invoiceData.id));
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

const INVOICES_LIST_ITEM_CLASS_NAME = 'invoices-list-item';
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

const checkAndUpdateNoInvoicesMessage = () => {
  const numberOfInvoices = document.getElementsByClassName(INVOICES_LIST_ITEM_CLASS_NAME).length;
  if (numberOfInvoices === 0) {
    const noInvoicesMessageElement = document.getElementById('message-no-invoices');
    showElement(noInvoicesMessageElement);
  }
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
      checkAndUpdateNoInvoicesMessage();
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
  const editInvoiceButtonId = `${BUTTON_EDIT_INVOICE_CLASS_NAME}--${invoiceData.id}`;
  const deleteInvoiceButtonId = `${BUTTON_DELETE_INVOICE_CLASS_NAME}--${invoiceData.id}`;
  const liElement = document.createElement('li');
  liElement.id = invoiceData.id;
  liElement.classList.add(INVOICES_LIST_ITEM_CLASS_NAME);
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
          <button id="${editInvoiceButtonId}" class="${BUTTON_EDIT_INVOICE_CLASS_NAME} btn btn-secondary">
            Edytuj
          </button>
          <button id="${deleteInvoiceButtonId}" class="${BUTTON_DELETE_INVOICE_CLASS_NAME} btn btn-danger">
            Usuń
          </button>
        </div>
      </div>
    </div>
  `;

  const noInvoicesMessageElement = document.getElementById('message-no-invoices');
  hideElement(noInvoicesMessageElement);

  const listElement = document.getElementById('invoices-list');
  listElement.appendChild(liElement);

  document.getElementById(editInvoiceButtonId)
    .addEventListener('click', () => navigateToFormEditMode(invoiceData.id));

  document.getElementById(deleteInvoiceButtonId)
    .addEventListener('click', () => requestDeleteInvoice(invoiceData.id));
};

const initializeInvoicesList = () => {
  const loadingAnimationElement = document.getElementById('loading-animation');
  const errorMessageElement = document.getElementById('error-message');

  getAllInvoices()
    .then((data) => {
      data.forEach(addInvoiceListItem);
      checkAndUpdateNoInvoicesMessage();
    })
    .catch(error => {
      showElement(errorMessageElement);
    })
    .finally(() => {
      hideElement(loadingAnimationElement);
    });
};

const initializeEventListeners = () => {
  document.getElementById('button-add-invoice').addEventListener('click', navigateToFormAddMode);
};

initializeInvoicesList();
initializeEventListeners();

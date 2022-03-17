const addInvoiceItem = (itemData) => {
  const invoiceItemOrder = document.getElementsByClassName('positions-list-item').length + 1;
  const nameInputId = `input--name--${invoiceItemOrder}`;
  const taxInputId = `input--tax--${invoiceItemOrder}`;
  const totalPriceGrossInputId = `input--total_price_gross--${invoiceItemOrder}`;
  const quantityInputId = `input--quantity--${invoiceItemOrder}`;

  const listItemHtml = `
    <li class="positions-list-item">
      <div class="row">
        <div class="col-3">
          <label for="${nameInputId}">Nazwa</label>
          <input id="${nameInputId}"
                 class="input--name"
                 type="text"
                 value="${itemData?.name ?? ''}"
          />
        </div>
        <div class="col-3">
          <label for="${taxInputId}">Stawka VAT</label>
          <input id="${taxInputId}"
                 class="input--vat"
                 type="number"
                 value="${itemData?.tax ?? ''}"
                 min="0"
          />
        </div>
        <div class="col-3">
          <label for="${totalPriceGrossInputId}">Wartość brutto</label>
          <input id="${totalPriceGrossInputId}"
                 class="input--total_price_gross"
                 type="number"
                 value="${itemData?.total_price_gross ?? ''}"
                 min="0"
                 step="0.1"
          />
        </div>
        <div class="col-3">
          <label for="${quantityInputId}">Ilość</label>
          <input id="${quantityInputId}"
                 class="input--quantity"
                 type="number"
                 value="${itemData?.quantity ?? ''}"
                 min="1"
          />
        </div>
      </div>
    </li>
  `;

  const noItemsMessageElement = document.getElementById('message-no-items');
  hideElement(noItemsMessageElement);

  const listElement = document.getElementById('positions-list');
  listElement.innerHTML += listItemHtml;
  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: 'smooth',
  });
};

const initializeFormValues = () => {
  const id = new URLSearchParams(window.location.search).get('id');

  const headerElement = document.getElementById('header');
  const subheaderElement = document.getElementById('subheader');
  const loadingAnimationElement = document.getElementById('loading-animation');
  const formElement = document.getElementById('invoice-form');
  const errorMessageElement = document.getElementById('error-message');

  if (!id) {
    headerElement.innerText = 'Nowa faktura';
    addInvoiceItem();
    showElement(formElement);
    return;
  }

  headerElement.innerText = 'Modyfikacja faktury';
  showElement(loadingAnimationElement);

  getInvoice(id)
    .then(data => {
      subheaderElement.innerText = `Numer faktury: ${data['number']}`;
      Object.entries(data).forEach(([key, value]) => {
        if (key === 'positions') {
          if (value?.length) {
            value.forEach(item => {
              addInvoiceItem(item);
            });
          } else {
            const noItemsMessageElement = document.getElementById('message-no-items');
            showElement(noItemsMessageElement);
          }
        }
        const input = document.getElementById(key);
        if (!input) {
          return;
        }
        input.value = value;
      });
      showElement(formElement);
    })
    .catch(error => {
      showElement(errorMessageElement);
    })
    .finally(() => {
      hideElement(loadingAnimationElement);
    });
};

const sendFormData = (e) => {
  const errorMessageElement = document.getElementById('error-message');

  const id = new URLSearchParams(window.location.search).get('id');

  const dataToSend = {
    issue_date: document.getElementById('issue_date').value,
    sell_date: document.getElementById('sell_date').value,
    seller_name: document.getElementById('seller_name').value,
    seller_tax_no: document.getElementById('seller_tax_no').value,
    buyer_name: document.getElementById('buyer_name').value,
    buyer_tax_no: document.getElementById('buyer_tax_no').value,
  };

  (id
      ? updateInvoice(id, dataToSend)
      : createInvoice(dataToSend)
  )
    .then(response => {
      window.location.href = 'list.html';
    })
    .catch(error => {
      showElement(errorMessageElement);
    });

  e.preventDefault();
  e.stopPropagation();
  return false;
};

initializeFormValues();

document.getElementById('invoice-form').addEventListener('submit', sendFormData);
document.getElementById('button-add-item').addEventListener('click', addInvoiceItem);

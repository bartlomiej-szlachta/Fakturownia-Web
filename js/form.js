const POSITIONS_LIST_ITEM_CLASS_NAME = 'positions-list-item';
const BUTTON_REMOVE_ITEM_CLASS_NAME = 'button-remove-item';
const NEW_ITEM_ID_PREFIX = 'NewItem';

const navigateToList = () => {
  window.location.href = 'list.html';
};

const disableAllFields = () => {
  document.querySelectorAll(`input, select, .${BUTTON_REMOVE_ITEM_CLASS_NAME}, #button-add-item, #button-save-invoice`)
    .forEach((input) => {
      input.disabled = true;
    });
};

const enableAllFields = () => {
  document.querySelectorAll(`input, select, .${BUTTON_REMOVE_ITEM_CLASS_NAME}, #button-add-item, #button-save-invoice`)
    .forEach((input) => {
      input.disabled = false;
    });
};

const addInvoiceItem = (itemData) => {
  const invoiceItemId = itemData?.id ?? `${NEW_ITEM_ID_PREFIX}${new Date().getTime()}`;
  const nameInputId = `input--name--${invoiceItemId}`;
  const taxInputId = `input--tax--${invoiceItemId}`;
  const totalPriceGrossInputId = `input--total_price_gross--${invoiceItemId}`;
  const quantityInputId = `input--quantity--${invoiceItemId}`;
  const removeItemButtonId = `${BUTTON_REMOVE_ITEM_CLASS_NAME}--${invoiceItemId}`;

  const noItemsMessageElement = document.getElementById('message-no-items');
  hideElement(noItemsMessageElement);

  const listItemContentHtml = `
    <div class="container-fluid px-0">
      <div class="row">
        <div class="col-12 col-md-4">
          <label for="${nameInputId}">Nazwa</label>
          <input id="${nameInputId}"
                 class="input--name"
                 type="text"
                 value="${itemData?.name ?? ''}"
          />
        </div>
        <div class="col-3 col-md-2">
          <label for="${taxInputId}">Stawka VAT</label>
          <select id="${taxInputId}"
                  class="input--tax w-100"
          >
            <option ${(itemData?.tax === '23%' || !itemData || !itemData?.tax) && 'selected'}>23%</option>
            <option ${itemData?.tax === '8%' && 'selected'}>8%</option>
            <option ${itemData?.tax === '5%' && 'selected'}>5%</option>
            <option ${itemData?.tax === '0%' && 'selected'}>0%</option>
            <option ${itemData?.tax === 'ZW' && 'selected'}>ZW</option>
            <option ${itemData?.tax === 'np.' && 'selected'}>np.</option>
          </select>
        </div>
        <div class="col-3 col-md-2">
          <label for="${totalPriceGrossInputId}">Wart. brutto</label>
          <input id="${totalPriceGrossInputId}"
                 class="input--total_price_gross"
                 type="number"
                 value="${parseFloat(itemData?.total_price_gross ?? 0).toFixed(2)}"
                 min="0"
                 step="0.01"
                 placeholder="0.00"
          />
        </div>
        <div class="col-3 col-md-2">
          <label for="${quantityInputId}">Ilość</label>
          <input id="${quantityInputId}"
                 class="input--quantity"
                 type="number"
                 value="${Math.floor(itemData?.quantity ?? 1)}"
                 min="1"
                 step="1"
          />
        </div>
        <div class="col-3 col-md-2 d-flex justify-content-center align-items-end"> 
          <button id="${removeItemButtonId}"
                  type="button"
                  class="${BUTTON_REMOVE_ITEM_CLASS_NAME}"
          >
            Usuń
          </button> 
        </div>
      </div>
    </div>
  `;

  const listItemElement = document.createElement('li');
  listItemElement.id = invoiceItemId;
  listItemElement.classList.add(POSITIONS_LIST_ITEM_CLASS_NAME);
  listItemElement.innerHTML = listItemContentHtml;

  const listElement = document.getElementById('positions-list');
  listElement.appendChild(listItemElement);

  document.getElementById(removeItemButtonId).addEventListener('click', () => {
    const listItemElement = document.getElementById(invoiceItemId);
    if (listItemElement.id.includes(NEW_ITEM_ID_PREFIX)) {
      listItemElement.remove();
    } else {
      listItemElement.classList.add('d-none');
    }
  });

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
  const loadingAnimationElement = document.getElementById('loading-animation');
  const errorMessageElement = document.getElementById('error-message');

  const id = new URLSearchParams(window.location.search).get('id');

  const invoiceItemsLength = document.getElementsByClassName(POSITIONS_LIST_ITEM_CLASS_NAME).length;

  const dataToSend = {
    issue_date: document.getElementById('issue_date').value,
    sell_date: document.getElementById('sell_date').value,
    seller_name: document.getElementById('seller_name').value,
    seller_tax_no: document.getElementById('seller_tax_no').value,
    buyer_name: document.getElementById('buyer_name').value,
    buyer_tax_no: document.getElementById('buyer_tax_no').value,
    positions: Array.apply(null, Array(invoiceItemsLength)).map(() => ({})),
  };

  document.querySelectorAll(`.${POSITIONS_LIST_ITEM_CLASS_NAME}`).forEach((li, index) => {
    if (!li.id.startsWith(NEW_ITEM_ID_PREFIX)) {
      dataToSend.positions[index]['id'] = li.id;
    }
    if (li.classList.contains('d-none')) {
      dataToSend.positions[index]['_destroy'] = 1;
    }
  });

  document.querySelectorAll('.input--name').forEach((input, index) => {
    dataToSend.positions[index]['name'] = input.value;
  });

  document.querySelectorAll('.input--tax').forEach((input, index) => {
    dataToSend.positions[index]['tax'] = input.value;
  });

  document.querySelectorAll('.input--total_price_gross').forEach((input, index) => {
    dataToSend.positions[index]['total_price_gross'] = input.value;
  });

  document.querySelectorAll('.input--quantity').forEach((input, index) => {
    dataToSend.positions[index]['quantity'] = input.value;
  });

  disableAllFields();
  showElement(loadingAnimationElement);
  hideElement(errorMessageElement);

  (id
      ? updateInvoice(id, dataToSend)
      : createInvoice(dataToSend)
  )
    .then(response => {
      navigateToList();
    })
    .catch(error => {
      showElement(errorMessageElement);
    })
    .finally(() => {
      enableAllFields();
      hideElement(loadingAnimationElement);
    });

  e.preventDefault();
  e.stopPropagation();
  return false;
};

initializeFormValues();

document.getElementById('invoice-form').addEventListener('submit', sendFormData);
document.getElementById('button-save-invoice').addEventListener('click', sendFormData);
document.getElementById('button-add-item').addEventListener('click', addInvoiceItem);
document.getElementById('button-go-to-list').addEventListener('click', navigateToList);

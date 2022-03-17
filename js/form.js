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
      Object.entries(data).forEach(([key, value]) => {
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
      window.location.href = '../list.html';
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

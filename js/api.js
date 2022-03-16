const API_TOKEN = 'm7WLd5P43RjL3kQhMHwh';
const OUR_DOMAIN = 'samograjepolsl';
const DATA_FORMAT = 'json';
const BASE_URL = `https://${OUR_DOMAIN}.fakturownia.pl/invoices`;
const params = new URLSearchParams({
  api_token: API_TOKEN,
});

const getAllInvoices = () => fetch(`${BASE_URL}.${DATA_FORMAT}?${params}`)
  .then(response => response.json())
  .catch(error => error.json());

const getInvoice = (id) => fetch(`${BASE_URL}/${id}.${DATA_FORMAT}?${params}`)
  .then(response => response.json())
  .catch(error => error.json());

const createInvoice = (data) => fetch(`${BASE_URL}.${DATA_FORMAT}?${params}`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    invoice: {
      ...data,
    }
  }),
})
  .then(response => response.json())
  .catch(error => error.json());

const updateInvoice = (id, data) => fetch(`${BASE_URL}/${id}.${DATA_FORMAT}?${params}`, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    invoice: {
      ...data,
    }
  }),
})
  .then(response => response.json())
  .catch(error => error.json());

const deleteInvoice = (id) => fetch(`${BASE_URL}/${id}.${DATA_FORMAT}?${params}`, {
  method: 'DELETE',
})
  .then(response => response.json())
  .catch(error => error.json());

const API_TOKEN = 'm7WLd5P43RjL3kQhMHwh';
const OUR_DOMAIN = 'samograjepolsl';
const DATA_FORMAT = 'json';
const BASE_URL = `https://${OUR_DOMAIN}.fakturownia.pl/invoices`;
const params = new URLSearchParams({
  api_token: API_TOKEN,
});

const handleApiResponse = (promise) => promise
  .catch(error => {
    if (error.json) {
      throw error.json();
    }
    throw {
      message: 'Błąd pobierania danych',
    };
  })
  .then(response => {
    if (!response.json) {
      throw {
        message: 'Błąd pobierania danych',
      };
    }
    if (!response.ok) {
      throw response.json();
    }
    return response.json();
  });

const getAllInvoices = () => handleApiResponse(fetch(`${BASE_URL}.${DATA_FORMAT}?${params}`));

const getInvoice = (id) => handleApiResponse(fetch(`${BASE_URL}/${id}.${DATA_FORMAT}?${params}`));

const createInvoice = (data) => handleApiResponse(fetch(`${BASE_URL}.${DATA_FORMAT}?${params}`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    invoice: {
      ...data,
    }
  }),
}));

const updateInvoice = (id, data) => handleApiResponse(fetch(`${BASE_URL}/${id}.${DATA_FORMAT}?${params}`, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    invoice: {
      ...data,
    }
  }),
}));

const deleteInvoice = (id) => handleApiResponse(fetch(`${BASE_URL}/${id}.${DATA_FORMAT}?${params}`, {
  method: 'DELETE',
}));

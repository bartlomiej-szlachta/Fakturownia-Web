describe('Lista faktur', () => {
  beforeEach(() => {
    cy.visit('https://fakturownia-web.herokuapp.com/');
  });

  it('Powinna wyświetlać nagłówek', () => {
    cy.contains('h1', 'Lista faktur');
    cy.removeAllInvoices();
  });

  it('Powinna wyświetlać informację o braku faktur', () => {
    cy.contains('Brak faktur');
  });

  it('Powinna zawierać przycisk dodawania faktury', () => {
    cy.contains('button', 'Dodaj fakturę');
  });

  it('Przycisk dodawania faktury powinien przekierować do formularza', () => {
    cy.get('#button-add-invoice').click();
    cy.url().should('include', 'form.html');
  });

});

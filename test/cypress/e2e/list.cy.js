describe('Lista faktur', () => {
  beforeEach(() => {
    cy.visit('/');
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

  it('Przycisk edycji faktury powinien przekierować do formularza', () => {
    cy.createExampleInvoice();
    cy.get('.button-edit-invoice').first().click();
    cy.url().should('include', 'form.html');
  });

});

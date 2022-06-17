describe('Zarządzanie fakturami', () => {

  it('Nowo dodana faktura powinna się pojawić na liście', () => {
    cy.visit('/');
    cy.wait(1000);
    cy.removeAllInvoices();
    cy.createExampleInvoice();
    cy.contains('Sprzedawca: Super sprzedawca');
    cy.contains('Nabywca: Super nabywca');
  });

  it('Zmiany w istniejącej fakturze powinny się pojawić na liście', () => {
    cy.visit('/');
    cy.wait(1000);
    cy.createExampleInvoice();
    cy.get('.button-edit-invoice').first().click();
    cy.get('#seller_name').clear().type('Najlepszy sprzedawca');
    cy.get('#button-save-invoice').click();
    cy.contains('Najlepszy sprzedawca');
  });

});
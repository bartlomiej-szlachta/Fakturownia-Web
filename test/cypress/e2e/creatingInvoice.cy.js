describe('Dodawanie faktury', () => {

  it('Nowo dodana faktura powinna się pojawić na liście', () => {
    cy.visit('/');
    cy.wait(1000);
    cy.removeAllInvoices();
    cy.get('#button-add-invoice').click();
    cy.get('#seller_name').type('Super sprzedawca');
    cy.get('#seller_tax_no').type('0000000000');
    cy.get('#buyer_name').type('Super nabywca');
    cy.get('#buyer_tax_no').type('0000000000');
    cy.get('.input--name').type('Nazwa pozycji');
    cy.get('.input--total_price_gross').clear().type('10.00');
    cy.get('#button-save-invoice').click();
    cy.contains('Sprzedawca: Super sprzedawca');
    cy.contains('Nabywca: Super nabywca');
  });

});
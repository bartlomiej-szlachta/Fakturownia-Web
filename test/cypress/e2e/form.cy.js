describe('Formularz dodawania / edycji faktury', () => {

  describe('W trybie dodawania', () => {

    beforeEach(() => {
      cy.visit('/');
      cy.get('#button-add-invoice').click();
    });

    it('Powinien wyświetlać odpowiedni nagłówek', () => {
      cy.contains('Nowa faktura');
    });

  });

  describe('W trybie edycji', () => {

    beforeEach(() => {
      cy.visit(`/`);
      cy.removeAllInvoices();
      cy.createExampleInvoice();
      cy.get('.button-edit-invoice').first().click();
    });

    it('Powinien wyświetlać odpowiedni nagłówek', () => {
      cy.contains('Modyfikacja faktury');
    });

  });

});

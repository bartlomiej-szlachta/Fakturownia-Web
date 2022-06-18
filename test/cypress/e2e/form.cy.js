describe('Formularz dodawania / edycji faktury', () => {

  describe('W trybie dodawania', () => {

    beforeEach(() => {
      cy.visit('/');
      cy.get('#button-add-invoice').click();
    });

    it('Powinien wyświetlać odpowiedni nagłówek', () => {
      cy.contains('Nowa faktura');
    });

    it('Powinien zawierać pola wypełnione inicjalnymi danymi', () => {
      const todayDate = new Date().toISOString().split('T')[0];
      cy.get('#issue_date').should('have.value', todayDate);
      cy.get('#sell_date').should('have.value', todayDate);
      cy.get('#seller_name').should('have.value', '');
      cy.get('#seller_tax_no').should('have.value', '');
      cy.get('#buyer_name').should('have.value', '');
      cy.get('#buyer_tax_no').should('have.value', '');
      cy.get('.input--name').should('have.value', '');
      cy.get('.input--tax').find('option:selected').should('have.value', '23%');
      cy.get('.input--total_price_gross').should('have.value', '0.00');
      cy.get('.input--quantity').should('have.value', '1');
    });

  });

  describe('W trybie edycji', () => {

    beforeEach(() => {
      cy.visit('/');
      cy.removeAllInvoices();
      cy.createExampleInvoice();
      cy.get('.button-edit-invoice').first().click();
    });

    it('Powinien wyświetlać odpowiedni nagłówek', () => {
      cy.contains('Modyfikacja faktury');
    });

    it('Powinien zawierać pola uzupełnione danymi wybranej faktury', () => {
      cy.get('#issue_date').should('have.value', '2022-06-01');
      cy.get('#sell_date').should('have.value', '2022-05-01');
      cy.get('#seller_name').should('have.value', 'Super sprzedawca');
      cy.get('#seller_tax_no').should('have.value', '0000000000');
      cy.get('#buyer_name').should('have.value', 'Super nabywca');
      cy.get('#buyer_tax_no').should('have.value', '1111111111');
      cy.get('.input--name').should('have.value', 'Nazwa pozycji');
      cy.get('.input--tax').find('option:selected').should('have.value', '5%');
      cy.get('.input--total_price_gross').should('have.value', '10.00');
      cy.get('.input--quantity').should('have.value', '2');
    });

  });

});

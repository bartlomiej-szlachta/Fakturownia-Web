// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('removeAllInvoices', () => {
  cy.document().then((document) => {
    const isAnyInvoiceDefined = document.getElementsByClassName('button-delete-invoice').length > 0;
    if (isAnyInvoiceDefined) {
      cy.get('.button-delete-invoice')
      .each((button) => {
        cy.wrap(button).click();
      });
    }
  });
});

Cypress.Commands.add('createExampleInvoice', () => {
  cy.get('#button-add-invoice').click();
  cy.get('#seller_name').type('Super sprzedawca');
  cy.get('#seller_tax_no').type('0000000000');
  cy.get('#buyer_name').type('Super nabywca');
  cy.get('#buyer_tax_no').type('0000000000');
  cy.get('.input--name').type('Nazwa pozycji');
  cy.get('.input--total_price_gross').clear().type('10.00');
  cy.get('#button-save-invoice').click();
});

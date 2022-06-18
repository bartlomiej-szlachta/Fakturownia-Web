describe('Zarządzanie fakturami', () => {

  beforeEach(() => {
    cy.visit('/');
    cy.wait(1000);
    cy.removeAllInvoices();
  });

  it('Gdy w systemie nie ma żadnych faktur, nie powinna się wyświetlać żadna faktura, ale powinien pojawić się odpowiedni komunikat', () => {
    cy.contains('Brak faktur');
    cy.contains('Faktura numer').should('not.exist');
    cy.contains('Sprzedawca:').should('not.exist');
    cy.contains('Nabywca:').should('not.exist');
    cy.contains('button', 'Usuń').should('not.exist');
    cy.contains('button', 'Edytuj').should('not.exist');
  });

  it('Nowo dodana faktura powinna się pojawić na liście oraz powinna otrzymać pierwszy wolny numer', () => {
    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();
    const isLeadingZeroNeeded = currentMonth < 10;
    const invoiceNumber = `1/${isLeadingZeroNeeded ? '0' : ''}${currentMonth}/${currentYear}`;

    cy.createExampleInvoice();
    cy.contains(`Faktura numer ${invoiceNumber}`);
    cy.contains('Sprzedawca: Super sprzedawca');
    cy.contains('Nabywca: Super nabywca');
    cy.contains('button', 'Edytuj');
    cy.contains('button', 'Usuń');
  });

  it('Zmiany w istniejącej fakturze powinny się pojawić na liście', () => {
    cy.createExampleInvoice();
    cy.get('.button-edit-invoice').first().click();
    cy.get('#seller_name').clear().type('Najlepszy sprzedawca');
    cy.get('#button-save-invoice').click();
    cy.contains('Najlepszy sprzedawca');
  });

  it('Usunięta faktura nie powinna być widoczna na liście', () => {
    cy.createExampleInvoice();
    cy.get('.button-delete-invoice').click();
    cy.contains('Brak faktur');
    cy.contains('Faktura numer').should('not.exist');
    cy.contains('Sprzedawca:').should('not.exist');
    cy.contains('Nabywca:').should('not.exist');
    cy.contains('button', 'Usuń').should('not.exist');
    cy.contains('button', 'Edytuj').should('not.exist');
  });

});
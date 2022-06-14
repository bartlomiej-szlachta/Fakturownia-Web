describe('Formularz faktury', () => {

  beforeEach(() => {
    cy.visit('form.html');
  });

  it('Powinien wyświetlać nagłówek w trybie dodawania', () => {
    cy.contains('Nowa faktura');
  });
});

describe('App E2E', () => {
  it('should have title', () => {
    cy.visit('/');

    cy.get('h1').should('have.text', 'Соберите бургер');
  });
});

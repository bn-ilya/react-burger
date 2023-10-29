import '@4tw/cypress-drag-drop';
import {
  getBtnCloseModalSelector,
  getBunSelector,
  getModalSelector,
} from '../../support/selectors';

describe('modals tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('open and close modal ingredient', () => {
    cy.get(getBunSelector);
    cy.get(getBunSelector).find('a').first().click();

    cy.get(getModalSelector).should('exist');

    cy.get(getBtnCloseModalSelector).click();

    cy.get(getModalSelector).should('not.exist');
  });

  it('open and close modal ingredient and check description', () => {
    cy.get(getBunSelector).find('a').first().click();

    cy.get(getModalSelector).should('exist');

    cy.get('[data-cy="ingredient-data-calories"]').should('exist');
    cy.get('[data-cy="ingredient-data-proteins"]').should('exist');
    cy.get('[data-cy="ingredient-data-fat"]').should('exist');
    cy.get('[data-cy="ingredient-data-carbohydrates"]').should('exist');

    cy.get(getBtnCloseModalSelector).click();

    cy.get(getModalSelector).should('not.exist');
  });

  it('open and close modal order', () => {
    // Construct burger
    cy.get(getBunSelector).find('a').first().drag('[data-cy="drop-zone-ingredient"]');
    cy.get('.constructor-element_pos_top').should('exist');
    cy.get('.constructor-element_pos_bottom').should('exist');

    cy.get('[data-cy="sauce"]').find('a').first().drag('[data-cy="drop-zone-ingredient"]');
    cy.get('[data-cy="constructor-sauce"]').should('exist');

    cy.get('[data-cy="main"]').find('a').first().drag('[data-cy="drop-zone-ingredient"]');
    cy.get('[data-cy="constructor-main"]').should('exist');

    // Аttempt create order
    cy.get('[data-cy="btn-create-order"]').click();

    // Authorization
    cy.get('.input_type_email').type('example@example.com');
    cy.get('.input_type_password').type('example');
    cy.get('[data-cy="btn-login"]').click();

    // Create order
    cy.intercept('POST', 'https://norma.nomoreparties.space/api/orders').as('apiRequest');

    cy.get('[data-cy="btn-create-order"]').click();

    cy.wait('@apiRequest').its('response.statusCode').should('eq', 200);

    // Check modal
    cy.get(getModalSelector).should('exist');

    cy.get(getBtnCloseModalSelector).click();

    cy.get(getModalSelector).should('not.exist');
  });
});

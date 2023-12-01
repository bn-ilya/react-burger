import '@4tw/cypress-drag-drop';
import { dropZoneIngredientSelector, getBunSelector } from '../../support/selectors';

describe('Drag and drop constructor test', () => {
  it('Drag and drop ingredients to constructor', () => {
    cy.visit('/');

    cy.get(getBunSelector).find('a').first().drag(dropZoneIngredientSelector);
    cy.get('.constructor-element_pos_top').should('exist');
    cy.get('.constructor-element_pos_bottom').should('exist');

    cy.get('[data-cy="sauce"]').find('a').first().drag(dropZoneIngredientSelector);
    cy.get('[data-cy="constructor-sauce"]').should('exist');

    cy.get('[data-cy="main"]').find('a').first().drag(dropZoneIngredientSelector);
    cy.get('[data-cy="constructor-main"]').should('exist');
  });
});

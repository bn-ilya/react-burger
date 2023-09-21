import PropTypes from 'prop-types';

export enum EIngredients {
  BUN = 'bun',
  SAUCE = 'sauce',
  MAIN = 'main',
}

export interface IIngredient {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
  count?: number;
}

export const modalHeaderType = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.number,
  PropTypes.element,
  PropTypes.node,
]);

export const additionalAction = PropTypes.shape({
  text: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  linkText: PropTypes.string.isRequired,
});

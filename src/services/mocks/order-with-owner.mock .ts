import { mockIngredient } from './ingredient.mock';

import { IOrderWithOwner } from '../../utils/types';

export const mockOrderWithOwner: IOrderWithOwner = {
  ingredients: [mockIngredient, mockIngredient],
  _id: '653aa45552b4cf001d86dadc',
  owner: {
    name: 'cы',
    email: 'bn.ilyaa@yandex.rus',
    createdAt: '2023-10-06T21:48:42.247Z',
    updatedAt: '2023-10-19T19:00:08.804Z',
  },
  status: 'done',
  name: 'Space флюоресцентный бургер',
  createdAt: '2023-10-26T17:39:33.788Z',
  updatedAt: '2023-10-26T17:39:34.655Z',
  number: 24490,
  price: 2056,
};

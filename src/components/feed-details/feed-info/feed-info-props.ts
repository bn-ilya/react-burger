import { IOrder, IIngredient } from '../../../utils/types';

export interface IFeedInfoProps {
  ingredients: Array<IIngredient['_id']>;
  createdAt: IOrder['createdAt'];
}

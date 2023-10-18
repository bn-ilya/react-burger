import { IFeed } from '../../../services/reducers/ws-feeds/types';
import { IIngredient } from '../../../utils/types';

export interface IFeedInfoProps {
  ingredients: Array<IIngredient['_id']>;
  createdAt: IFeed['createdAt'];
}

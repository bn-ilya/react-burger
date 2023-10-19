import { IOrder } from '../../../utils/types';

export default interface FeedStructureProps {
  ingredientsId: Array<IOrder['_id']>;
}

import { Order } from '../../../services/reducers/ws-feeds/types';

export default interface FeedStructureProps {
  ingredientsId: Array<Order['_id']>;
}

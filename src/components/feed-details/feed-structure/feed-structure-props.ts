import { IFeed } from '../../../services/reducers/ws-feeds/types';

export default interface FeedStructureProps {
  ingredientsId: Array<IFeed['_id']>;
}

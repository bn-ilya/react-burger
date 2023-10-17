import { EStatuses } from '../../../utils/types';

export interface IFeedHeaderProps {
  showNumberFeed?: boolean;
  number: number;
  name: string;
  status: EStatuses;
}

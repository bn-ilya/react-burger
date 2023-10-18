import { EStatuses } from '../../../utils/types';

export interface IFeed {
  ingredients: string[];
  _id: string;
  status: EStatuses;
  name: string;
  number: number;
  createdAt: string;
  updatedAt: string;
}

export interface ResponseFeedsAll {
  success: boolean;
  orders: IFeed[];
  total: number;
  totalToday: number;
}

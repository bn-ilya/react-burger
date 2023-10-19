import { IOrder } from '../../../utils/types';

export interface IFeedsAllResponse {
  success: boolean;
  orders: IOrder[];
  total: number;
  totalToday: number;
}

export interface IFeedByNumberResponse {
  success: boolean;
  orders: IOrder[];
}

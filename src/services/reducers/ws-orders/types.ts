import { IOrder } from '../../../utils/types';

export interface IOrdersAllResponse {
  success: boolean;
  orders: IOrder[];
  total: number;
  totalToday: number;
}

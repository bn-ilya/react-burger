import { EStatuses } from '../../../utils/types';

export interface Order {
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
  orders: Order[];
  total: number;
  totalToday: number;
}

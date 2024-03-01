import type { IOrderCard } from "./order-card";

export interface IOrder {
  time: number;
  card: IOrderCard;
}

export const createOrder = (options: IOrder): IOrder => {
  return {
    ...options,
  };
}
import type { ICard } from "./card";
import type { OrderCardKey } from "../domain/order-card";

export interface IOrderCard extends ICard {
  type: "order-card";
  key: OrderCardKey;
}
export const createOrderCard = (options: Omit<IOrderCard, "type" | "isFlipped">): IOrderCard => {
  return {
    ...options,
    type: "order-card",
    isFlipped: false,
  }
}
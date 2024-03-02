import type { IOrderCardInfo, OrderCardKey } from "../domain/order-card";

export interface IOrderCardPort {
  getOrderCards: () => Promise<IOrderCardInfo[]>;
  getOrderCardDeck: () => Promise<OrderCardKey[]>;
}
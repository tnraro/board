import type { ICounter } from "./counter"
import type { IEntity } from "./entity"
import type { IOrderCard } from "./order-card"

export interface IPlayer extends IEntity {
  uid: string,
  counters: ICounter[],
  upgrades: boolean[],
  orders: IOrderCard[],
  completedOrders: IOrderCard[],
  canceledOrders: IOrderCard[],
}
export const createPlayer = (options: Omit<IPlayer, "counters" | "upgrades" | "orders" | "completedOrders" | "canceledOrders">): IPlayer => {
  return {
    ...options,
    counters: [],
    upgrades: [false, false, false, false],
    orders: [],
    completedOrders: [],
    canceledOrders: [],
  }
}
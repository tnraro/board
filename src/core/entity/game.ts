import type { IEntity } from "./entity";
import type { IIngredient } from "./ingredient";
import type { IOrderCard } from "./order-card";
import type { IPlayer } from "./player";

export interface Game extends IEntity {
  deck: IOrderCard[];
  players: IPlayer[];
  ingredients: IIngredient[];
}
export const createGame = (options: Omit<Game, "players">): Game => {
  return {
    ...options,
    players: [],
  }
}
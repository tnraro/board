import type { IEntity } from "./entity";
import type { IIngredient } from "./ingredient";
import type { IOrderCard } from "./order-card";
import type { IPlayer } from "./player";

export interface IGame extends IEntity {
  round: number;
  turn: number;
  deck: IOrderCard[];
  players: IPlayer[];
  ingredients: IIngredient[];
}
export const createGame = (options: Omit<IGame, "round" | "turn" | "players">): IGame => {
  return {
    ...options,
    round: 0,
    turn: 0,
    players: [],
  }
}
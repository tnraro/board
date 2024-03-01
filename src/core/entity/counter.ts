import type { IEntity } from "./entity";
import type { IIngredient } from "./ingredient";

export interface ICounter extends IEntity {
  ingredients: IIngredient[];
}
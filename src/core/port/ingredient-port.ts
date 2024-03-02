import type { IIngredientInfo } from "../domain/ingredient";

export interface IIngredientPort {
  getIngredientsInfo: () => Promise<IIngredientInfo[]>;
}
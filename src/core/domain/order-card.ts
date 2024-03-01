import type { IngredientKey } from "./ingredient";

export type OrderCardKey = string;
export interface IOrderCardInfo {
  key: OrderCardKey;
  isSpecial: boolean;
  ingredients: IngredientKey[]
}
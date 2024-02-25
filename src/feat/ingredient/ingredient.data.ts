import type { IIngredient } from "./ingredient";
import data from "./ingredient.data.json";

export const ingredientData = new Map<string, IIngredient>(
  data.map(x => [x.id, x])
);
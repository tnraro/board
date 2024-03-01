import type { IngredientKey } from "../domain/ingredient";
export interface IIngredient {
  id: string;
  key: IngredientKey;
}
export const createIngredient = (options: IIngredient): IIngredient => {
  return {
    ...options,
  };
}
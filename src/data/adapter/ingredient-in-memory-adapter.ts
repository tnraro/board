import type { IIngredientPort } from "../../core/port/ingredient-port";

export class IngredientInMemoryAdapter implements IIngredientPort {
  async getIngredientsInfo() {
    return [
      { key: "bread", isSpecial: false },
      { key: "cheese", isSpecial: true },
      { key: "meat", isSpecial: false },
      { key: "ice", isSpecial: true },
      { key: "water", isSpecial: true },
      { key: "milk", isSpecial: false },
      { key: "potato", isSpecial: false },
      { key: "rice", isSpecial: true },
    ];
  }
}
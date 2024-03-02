import { IngredientInMemoryAdapter } from "../../data/adapter/ingredient-in-memory-adapter";
import { OrderCardInMemoryAdapter } from "../../data/adapter/order-card-in-memory-adapter";
import type { IIngredientInfo } from "../domain/ingredient";
import type { IOrderCardInfo, OrderCardKey } from "../domain/order-card";
import type { IIngredientPort } from "../port/ingredient-port";
import type { IOrderCardPort } from "../port/order-card-port";

export class Info {
  static orderCards: IOrderCardInfo[];
  static orderCardDeck: OrderCardKey[];
  static ingredients: IIngredientInfo[];
  static async load() {
    const orderCardPort: IOrderCardPort = new OrderCardInMemoryAdapter();
    const ingredientPort: IIngredientPort = new IngredientInMemoryAdapter();
    if (this.orderCards == null) {
      this.orderCards = await orderCardPort.getOrderCards();
    }
    if (this.orderCardDeck == null) {
      this.orderCardDeck = await orderCardPort.getOrderCardDeck();
    }
    if (this.ingredients == null) {
      this.ingredients = await ingredientPort.getIngredientsInfo();
    }
  }
}


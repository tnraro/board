import { GameInMemoryAdapter } from "../data/adapter/game-in-memory-adapter";
import { IngredientInMemoryAdapter } from "../data/adapter/ingredient-in-memory-adapter";
import { OrderCardInMemoryAdapter } from "../data/adapter/order-card-in-memory-adapter";
import type { KebabToPascalCase } from "../lib/utility-types";
import type { IntrinsicEvent, IntrinsicLogic, IntrinsicPorts } from "./config";
import { gameLogic } from "./logic/game";

export const ports: IntrinsicPorts = {
  game: new GameInMemoryAdapter(),
  ingredient: new IngredientInMemoryAdapter(),
  orderCard: new OrderCardInMemoryAdapter(),
}

export const logics: IntrinsicLogic[] = [
  gameLogic
];

const toEventName = <Type extends keyof IntrinsicEvent>(type: Type) => {
  return type.replaceAll(/(^.)|(-.)/g, (_, $1, $2) => {
    if ($1 != null) return `on${$1.toUpperCase()}`
    if ($2 != null) return $2[1].toUpperCase();
  }) as `on${KebabToPascalCase<Type>}`;
}

export const emit = <Type extends keyof IntrinsicEvent>(type: Type, event: IntrinsicEvent[Type]) => {
  const eventName = toEventName(type);
  for (const logic of logics) {
    const handler = logic[eventName];
    handler?.(event as any, ports);
  }
}
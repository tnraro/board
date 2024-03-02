import type { KebabToPascalCase } from "../lib/utility-types";
import type { IGamePort } from "./port/game-port";
import type { IIngredientPort } from "./port/ingredient-port";
import type { IOrderCardPort } from "./port/order-card-port";

export interface IntrinsicEvent {
  "start-game": {
    players: string[];
  },
  "end-game": {
    winner: string;
  }
}

export interface IntrinsicPorts {
  game: IGamePort;
  ingredient: IIngredientPort;
  orderCard: IOrderCardPort;
}

type EventMap<Event> = {
  [Type in keyof Event]: { type: Type } & Event[Type];
}

export type Logic<Event, Ports> = {
  [Type in keyof Event as `on${KebabToPascalCase<Type & string>}`]?: (event: EventMap<Event>[Type], ports: Ports) => void;
}

export type IntrinsicLogic = Logic<IntrinsicEvent, IntrinsicPorts>;
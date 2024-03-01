import type { IEntity } from "./entity";

export interface ICard extends IEntity {
  type: string;
  isFlipped: boolean;
}
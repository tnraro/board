import type { IOrderCard } from "./order-card";
import data from "./order-card.data.json";

export const orderCardData = new Map<string, IOrderCard>(data.map(x => [x.id, x]));
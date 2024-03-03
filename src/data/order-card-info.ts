import { groupBy } from "../lib/utils/map-group-by";

export interface OrderCardInfo {
  key: string;
  name: string;
  recipe: string[];
  resource: string;
  isSpecial: boolean;
}

const data: OrderCardInfo[] = [
  {
    key: "pizza",
    name: "피자",
    recipe: ["bread", "cheese", "meat"],
    resource: "/food/pizza.svg",
    isSpecial: true,
  },
  {
    key: "sushi",
    name: "스시",
    recipe: ["rice", "meat"],
    resource: "/food/sushi.svg",
    isSpecial: false,
  },
];

export const orderCardInfo = groupBy(data, (info) => info.key);
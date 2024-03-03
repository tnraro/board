import { groupBy } from "../lib/utils/map-group-by";

export interface IngredientInfo {
  key: string;
  color: number;
  resource: string;
}

const data: IngredientInfo[] = [
  {
    key: "bread",
    color: 0xAD7F58,
    resource: "/ingredient/bread.svg",
  },
  {
    key: "cheese",
    color: 0xFFC53D,
    resource: "/ingredient/cheese.svg",
  },
  {
    key: "meat",
    color: 0xE5484D,
    resource: "/ingredient/meat.svg",
  },
  {
    key: "rice",
    color: 0xFCFCFC,
    resource: "/ingredient/rice.svg",
  },
];

export const ingredientInfo = groupBy(data, (info) => info.key);
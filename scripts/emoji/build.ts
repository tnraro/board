import { generateFoodInfos } from "./app/generate-json";
import { foods } from "./lib/foods";

const _foods = [..."🥐🥯🥖🥨🥞🧇🍗🌭🍔🍟🍕🫓🥪🥙🌮🌯🫔🥗🍛🍣🥟🍤🍙🍚🍘🍢🍡🍧🍨🍦🥧🧁🍰🎂🍮🍩🍪☕️🍵🥤🧋🍺"];
const _ingredient = [..."🫘🍞🍚🥩🥕🥛🧊"];

interface IOrderCard {
  id: string;
  name: string;
  image: string;
  description: string;
  ingredients: string[];
  grade: number;
}

const m = new Map(foods.map(food => [food.emoji, food]));

const ing = _ingredient
  .map(x => m.get(x))
  .filter(x => x != null)

const foo = _foods
  .map(x => m.get(x))
  .filter(<T>(x: T | undefined): x is T => x != null)

const orderCards = [];
for (const food of foo) {
  try {
    const generated = await generateFoodInfos(food.ko);
    const id = food.en.replaceAll(/\s+/g, "-");
    const orderCard: IOrderCard = {
      id,
      name: food.ko,
      description: "기본값",
      grade: 0,
      image: `/food/${id}.svg`,
      ingredients: [],
      ...generated,
    };
    orderCard.grade = orderCard.ingredients.length - 1
    orderCards.push(orderCard);
  } catch (e) {
    console.error(e)
  }
}

Bun.write("order-card.data.json", JSON.stringify(orderCards, undefined, 2));
import { foods } from "./lib/foods";

const _foods = [..."🥐🥯🥖🥨🥞🧇🍗🌭🍔🍟🍕🫓🥪🥙🌮🌯🫔🥗🥘🥫🍛🍣🍱🥟🍤🍙🍚🍘🍢🍡🍧🍨🍦🥧🧁🍰🎂🍮🍭🍬🍫🍿🍩🍪☕️🍵🧃🥤🧋🍺🍾"];
const _ingredient = [..."🫘🍞🍚🥩🥕🥛🧊"];

const m = new Map(foods.map(food => [food.emoji, food]));

const ing = _ingredient
  .map(x => m.get(x))
  .filter(x => x != null)

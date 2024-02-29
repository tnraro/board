import { chat } from "../lib/ollama";

const ingredients = new Set(["beans", "bread", "meat", "rice", "milk", "herb", "ice", "water"]);
const ingredientsString = `[${[...ingredients].map(x => `"${x}"`).join(", ")}]`

const system = `create json object.
name field: it's my input
description field: promotional pharse in korean
ingredients field: pick one to three in this array for recipe. ${ingredientsString} but you can't pick bread and rice together. ingredients must be make sense don't use wrong ingredients. don't change to similar ingredient just pass it
just tell me json without Explanation`;

const example = `{
  "name": "생일 케이크",
  "description": "달콤함이 퍼지는 행복, 생일 축하합니다!",
  "ingredients": ["bread", "milk"]
}`;

const validGeneratedFoodInfo = async (food: string, content: string) => {
  try {
    const o = JSON.parse(content);
    const keys = [...Object.keys(o)];
    if (keys.length !== 3) {
      throw keys;
    }
    if (typeof o.name !== "string") throw "name is not a string";
    if (o.name.toLowerCase() !== food.toLowerCase()) throw "name mismatch";
    if (typeof o.description !== "string") throw "description is not a string";
    if (/[^ㄱ-ㅎ가-힣a-z ,?!.]/i.test(o.description)) throw "description mismatch";
    if (!Array.isArray(o.ingredients)) throw "ingredients is not a array";
    if (o.ingredients.some((x: string) => !ingredients.has(x))) throw "ingredient mismatch";
    return o as {
      name: string,
      description: string,
      ingredients: ("beans" | "bread" | "carrot" | "rice" | "milk" | "herb" | "ice" | "water")[],
    };
  } catch (error) {
    throw [error, food, content];
  }
}

export const generateFoodInfo = async (food: string) => {
  const message = await chat("phi:2.7b-chat-v2-q4_K_M", [
    {
      "role": "system",
      "content": system,
    },
    {
      "role": "user",
      "content": "생일 케이크",
    },
    {
      "role": "assistant",
      "content": example,
    },
    {
      "role": "user",
      "content": food
    }
  ]);
  const result = validGeneratedFoodInfo(food, message.content);
  return result;
}

export const generateFoodInfos = async (food: string, retry = 3) => {
  type Result<T, E> = { success: true, value: T } | { success: false, error: E };
  const results: Result<Awaited<ReturnType<typeof generateFoodInfo>>, unknown>[] = [];
  for (let i = 0; i < retry; i++) {
    try {
      const result = await generateFoodInfo(food);
      return result;
    } catch (error) {
      console.log(error);
    }
  }
}

// {
//   "id": "birthday-cake",
//   "name": "생일 케이크",
//   "image": "/food/birthday-cake.svg",
//   "description": "달콤함이 퍼지는 행복, 생일 축하합니다!",
//   "ingredients": ["bread", "milk", "carrot"],
//   "grade": 2
// },
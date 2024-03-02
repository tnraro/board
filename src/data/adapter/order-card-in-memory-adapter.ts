import type { OrderCardKey } from "../../core/domain/order-card";
import type { IOrderCardPort } from "../../core/port/order-card-port";

export class OrderCardInMemoryAdapter implements IOrderCardPort {
  async getOrderCards() {
    return [
      {
        key: "fondue",
        ingredients: ["bread", "cheese"],
        isSpecial: false,
      },
      {
        key: "pizza",
        ingredients: ["bread", "cheese", "meat"],
        isSpecial: true,
      },
      {
        key: "hamburger",
        ingredients: ["bread", "cheese", "meat"],
        isSpecial: true,
      },
      {
        key: "sandwich",
        ingredients: ["bread", "cheese", "meat"],
        isSpecial: true,
      },
      {
        key: "taco",
        ingredients: ["bread", "cheese", "meat"],
        isSpecial: true,
      },
      {
        key: "burrito",
        ingredients: ["bread", "rice", "meat"],
        isSpecial: true,
      },
      {
        key: "bagel",
        ingredients: ["bread"],
        isSpecial: false,
      },
      {
        key: "baguette",
        ingredients: ["bread", "milk"],
        isSpecial: false,
      },
      {
        key: "croissant",
        ingredients: ["bread", "milk"],
        isSpecial: false,
      },
      {
        key: "bacon",
        ingredients: ["meat"],
        isSpecial: false,
      },
      {
        key: "bento",
        ingredients: ["rice", "meat"],
        isSpecial: false,
      },
      {
        key: "curry-rice",
        ingredients: ["rice", "meat", "potato"],
        isSpecial: true,
      },
      {
        key: "ice-cream",
        ingredients: ["ice", "milk"],
        isSpecial: false,
      },
      {
        key: "shaved-ice",
        ingredients: ["ice", "milk", "cheese"],
        isSpecial: true,
      },
      {
        key: "soft-ice-cream",
        ingredients: ["ice", "milk"],
        isSpecial: false,
      },
      {
        key: "rice-ball",
        ingredients: ["rice", "meat"],
        isSpecial: false,
      },
      {
        key: "sushi",
        ingredients: ["rice", "meat"],
        isSpecial: false,
      },
    ];
  }
  async getOrderCardDeck() {
    const data = await this.getOrderCards();
    return data
      .reduce((acc, orderCardInfo) => {
        const key = orderCardInfo.key;
        acc.push(key, key, key, key);
        return acc;
      }, [] as OrderCardKey[]);
  }
}
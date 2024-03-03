import { Container, Graphics, Sprite, Text } from "pixi.js";
import { ingredientInfo } from "../../data/ingredient-info";
import { orderCardInfo } from "../../data/order-card-info";
import { getTweenId, tween } from "../tween/tween";
import { cubic } from "../tween/easing";

export class Card extends Container {
  static readonly width = 90;
  static readonly height = 120;
  static readonly right = 32;
  static readonly left = Card.width - Card.right;
  static readonly radius = 8;
  readonly key;
  #value: Record<string, number> = {
    angle: -Math.PI,
  };
  #flipped = true;
  #front = new Container();
  #back = new Container();
  constructor(key: string) {
    super();
    this.key = key;
    this.pivot.set(Card.width / 2, Card.height / 2);
    this.#buildFront();
    this.#front.visible = false;
    this.#buildBack();
    this.eventMode = "dynamic";
  }
  get tx() {
    return this.position.x;
  }
  set tx(value: number) {
    tween({
      id: getTweenId(this) + "x",
      time: 30,
      origin: this.x,
      target: value,
      easing: cubic(.29, .24, 0, .99),
      onchange: (v) => {
        this.position.x = v;
      }
    })
  }
  get ty() {
    return this.position.y;
  }
  set ty(value: number) {
    tween({
      id: getTweenId(this) + "y",
      time: 30,
      origin: this.y,
      target: value,
      easing: cubic(.29, .24, 0, .99),
      onchange: (v) => {
        this.position.y = v;
      }
    })
  }
  get flipped() {
    return this.#flipped;
  }
  set flipped(value: boolean) {
    this.#flipped = value;
    tween({
      id: getTweenId(this) + "flipped",
      time: 30,
      origin: this.#value.angle,
      target: value ? -Math.PI : 0,
      easing: cubic(.13, .66, .5, 1.32),
      onchange: (v) => {
        this.#value.angle = v;
        const x = Math.cos(v);
        const flipped = x < 0;
        this.#back.visible = flipped;
        this.#front.visible = !flipped;
        this.scale.x = x;
        this.angle = Math.sin(-v * 2) * 10;
      }
    });
  }
  #buildFront() {
    const { width, height, right, left, radius } = Card;
    const info = orderCardInfo.get(this.key);
    if (info == null) throw new Error(`key '${this.key}' does not exist`);

    const frame = new Graphics();
    frame.beginFill("#F1F0EF");
    frame.lineStyle({ color: "#21201C", width: 1, alignment: 1 });
    frame.drawRoundedRect(0, 0, width, height, radius);
    this.#front.addChild(frame);


    const rightFrame = new Graphics();
    rightFrame.beginFill("#DAD9D6");
    rightFrame.drawRoundedRect(left, 0, right, height, radius);
    rightFrame.drawRect(left, 0, radius, height);
    this.#front.addChild(rightFrame);

    const foodSprite = Sprite.from(info.resource);
    foodSprite.x = left / 2;
    foodSprite.y = height * 0.5;
    foodSprite.scale.set(0.3, 0.3);
    foodSprite.angle = 10;
    foodSprite.anchor.set(0.5, 0.5);
    this.#front.addChild(foodSprite);

    if (info.isSpecial) {
      const w = 20;
      const h = 28;
      const specialBadge = new Graphics();
      specialBadge.beginFill("#FFBA18");
      specialBadge.drawPolygon([
        0, 0,
        w, 0,
        w, h,
        w / 2, h - w / 2,
        0, h
      ])
      specialBadge.x = 10;
      this.#front.addChild(specialBadge);
    }

    const name = new Text(info.name, {
      align: "center",
      fontSize: "1rem",
      fontFamily: "Pretendard Variable",
      fontWeight: "bold",
      padding: 8,
    });
    name.x = (left - name.width) / 2;
    name.y = height - name.height - 16;
    this.#front.addChild(name);

    info.recipe.forEach((ingredient, i, recipe) => {
      const info = ingredientInfo.get(ingredient);
      if (info == null) throw new Error(`key '${ingredient}' does not exist`);

      const r = (right - 8) / 2;
      const x = left + right / 2;
      const y = height / 2 + (i - (recipe.length - 1) / 2) * (r * 2 + 4);

      const circle = new Graphics();
      circle.beginFill(info.color);
      circle.drawRect(0, -r, right / 2, r * 2);
      circle.drawCircle(0, 0, r);
      circle.x = x;
      circle.y = y;
      this.#front.addChild(circle);

      const ingredientSprite = Sprite.from(info.resource);
      ingredientSprite.width = ingredientSprite.height = (r - 4) * 2;
      ingredientSprite.anchor.set(0.5, 0.5);
      ingredientSprite.x = x;
      ingredientSprite.y = y;
      this.#front.addChild(ingredientSprite);
    });

    this.addChild(this.#front);
  }
  #buildBack() {
    const { width, height, radius } = Card;

    const frame = new Graphics();
    frame.beginFill("#8D8D86");
    frame.lineStyle({ color: "#21201C", width: 1, alignment: 1 });
    frame.drawRoundedRect(0, 0, width, height, radius);
    this.#back.addChild(frame);

    this.addChild(this.#back);
  }
}
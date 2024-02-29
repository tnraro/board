<script lang="ts">
  import CardHelper from "../feat/card/card-helper.svelte";
  import Card from "../feat/card/card.svelte";
  import IngredientHelper from "../feat/ingredient/ingredient-helper.svelte";
  import { orderCardData } from "../feat/order-card/order-card.data";
  import OrderCard from "../feat/order-card/order-card.svelte";
  import Canvas from "./canvas.svelte";

  interface ICard {
    id: string;
    x: number;
    y: number;
    z: number;
    r: number;
    flipped: boolean;
    type: string;
    key: string;
  }
  let cards: ICard[] = $state([]);
  $effect.pre(() => {
    const keys = [...orderCardData.keys()];
    for (let i = 0; i < 40; i++) {
      cards.push({
        id: crypto.randomUUID(),
        x: 40,
        y: 16,
        z: 40 - i,
        r: 0,
        flipped: true,
        type: "order-card",
        key: keys[(keys.length * Math.random()) | 0],
      });
    }
    interface IDeck {
      x: number;
      y: number;
      stack: ICard[];
    }
    let deck: IDeck[] = [
      { x: 16, y: 4, stack: [] },
      { x: 60, y: 4, stack: [] },
      { x: 60, y: 30, stack: [] },
      { x: 16, y: 30, stack: [] },
      { x: 40, y: 16, stack: [] },
    ];
    const sleep = (d = 0) => new Promise((p) => setTimeout(p, d));
    const stackCard = (deck: IDeck, card: ICard) => {
      card.x = deck.x;
      card.y = deck.y;
      card.z = deck.stack.length;
      deck.stack.push(card);
    };
    const stackDeck = (deck: IDeck, rhs: IDeck) => {
      for (const card of rhs.stack) {
        stackCard(deck, card);
      }
      rhs.stack = [];
    };
    const moveDeck = (deck: IDeck, opt: Partial<Omit<IDeck, "stack">>) => {
      if (opt.x != null) deck.x = opt.x;
      if (opt.y != null) deck.y = opt.y;
      for (const card of deck.stack) {
        card.x = deck.x;
        card.y = deck.y;
      }
    };
    const popDeck = (deck: IDeck): ICard | undefined => {
      const card = deck.stack.pop();
      if (card == null) return card;
      card.z = 0;
      return card;
    };
    setTimeout(async () => {
      for (let i = 0; i < 40; i++) {
        stackCard(deck[i % 4], cards[i]);
        cards[i].flipped = i % 4 !== 0;
        await sleep(i % 4 === 0 ? 200 : 10);
      }
      await sleep(1000);
      stackDeck(deck[0], deck[1]);
      await sleep(500);
      stackDeck(deck[2], deck[3]);
      await sleep(500);
      stackDeck(deck[0], deck[2]);
      await sleep(500);
      stackDeck(deck[4], deck[0]);
      await sleep(1000);
      while (true) {
        let i = 0;
        while (true) {
          const card = popDeck(deck[4]);
          if (card == null) break;
          stackCard(deck[i % 4], card);
          await sleep(10);
          i++;
        }
        await sleep(1000);
        stackDeck(deck[0], deck[1]);
        stackDeck(deck[2], deck[3]);
        await sleep(500);
        stackDeck(deck[4], deck[2]);
        stackDeck(deck[4], deck[0]);
        await sleep(1000);
        {
          let i = 0;
          while (true) {
            const card = popDeck(deck[4]);
            if (card == null) break;
            stackCard(deck[i % 4], card);
            await sleep(10);
            i++;
          }
        }
        {
          for (const card of deck[1].stack) {
            card.flipped = !card.flipped;
          }
        }
        stackDeck(deck[1], deck[3]);
        stackDeck(deck[2], deck[0]);
        await sleep(500);
        {
          while (true) {
            const card1 = popDeck(deck[1]);
            if (card1 != null) {
              stackCard(deck[4], card1);
            }
            await sleep(10);
            const card2 = popDeck(deck[2]);
            if (card2 != null) {
              stackCard(deck[4], card2);
            }
            await sleep(10);
            if (card1 == null && card2 == null) break;
          }
        }
        await sleep(1000);
        {
          const card = popDeck(deck[4])!;
          console.log(card);
          card.flipped = !card.flipped;
        }
      }
    }, 1000);
  });
</script>

<Canvas>
  {#each cards as card (card.id)}
    <Card {...card}>
      <OrderCard id={card.key} />
    </Card>
  {/each}
</Canvas>

<IngredientHelper />

<CardHelper />

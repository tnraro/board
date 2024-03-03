<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import { PixiApp } from "./pixi/app";
  import { Card } from "./pixi/card";
  import { updateTween } from "./tween/tween";
  let canvas: HTMLCanvasElement;
  onMount(() => {
    const app = new PixiApp(canvas);
    const card = new Card("pizza");

    const cards: Card[] = [];

    card.x = 100;
    card.y = 200;

    card.on("pointerdown", (e) => {
      card.flipped = !card.flipped;
    });

    app.stage.eventMode = "static";
    app.stage.on("pointerdown", (e) => {
      const card = new Card(["pizza", "sushi"][(Math.random() * 2) | 0])
      cards.push(card);
      card.x = app.screen.width / 2;
      card.y = 0;
      card.tx = app.screen.width * Math.random();
      card.ty = app.screen.height * Math.random();
      card.flipped = false;
      app.stage.addChild(card);
    });

    app.ticker.add((delta) => {
      updateTween(delta);
    });

    app.stage.addChild(card);
  });
  onDestroy(() => {});
</script>

<canvas class="_" bind:this={canvas}></canvas>

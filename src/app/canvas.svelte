<script lang="ts">
  import { onDestroy, onMount, type Snippet } from "svelte";
  import { debounce } from "../lib/util";

  const resize = debounce(200, () => {
    const w = window.innerWidth / 16;
    const h = window.innerHeight / 16;
    const ratio = 16 / 9;
    const base = Math.min(w, h * ratio);
    const scale = base / 120;
    console.log(scale);
    document.querySelector("html")!.style.fontSize = `${scale}rem`;
  });
  interface Props {
    children: Snippet;
  }
  let { children } = $props<Props>();
  $effect.pre(() => {
    resize.done();
  });
  onDestroy(() => {
    resize.cancel();
  });
</script>

<div class="_">
  {@render children()}
</div>

<svelte:window onresize={resize} />

<style lang="scss">
  ._ {
    width: 120rem;
    height: 67.5rem;
    overflow: hidden;
    outline: 4px solid red;
    outline-offset: -4px;
    position: relative;
  }
</style>

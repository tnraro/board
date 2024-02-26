<script lang="ts">
  import Ingredient from "../ingredient/ingredient.svelte";
  import { orderCardData } from "./order-card.data";
  import { selectedIngredient } from "../ingredient/ingredient-state.svelte";
  interface Props {
    id: string;
  }
  let { id } = $props<Props>();
  let info = $derived(orderCardData.get(id)!);
</script>

<div
  class="_"
  class:_--0={info.grade === 0}
  class:_--1={info.grade === 1}
  class:_--2={info.grade === 2}
>
  <div class="_grade">{"⭐".repeat(info.grade + 1)}</div>
  <p class="_name">{info.name}</p>
  <div class="_image">
    <img src={info.image} alt="" draggable="false" />
  </div>
  <p class="_ingredients-title">필요 재료</p>
  <div class="_ingredients-items">
    {#each info.ingredients as ingredientId}
      <button class="_ingredients-item ingredient" data-id={ingredientId}>
        <Ingredient id={ingredientId} />
      </button>
    {/each}
  </div>
</div>

<style lang="scss">
  ._ {
    display: grid;
    grid-template:
      "grade" min-content
      "name" min-content
      "image" minmax(0, 1fr)
      "ingredients-title" min-content
      "ingredients-items" min-content / 1fr;
    width: 12rem;
    aspect-ratio: 3/4;
    border-radius: 0.5rem;
    ---bg: var(--gold-3);
    outline: 1px solid var(--gold-6);
    color: var(--gold-12);
    background: var(--gold-1);
    user-select: none;
    &--1 {
      outline-color: var(--grass-6);
      color: var(--grass-11);
      background: var(--grass-1);
      ---bg: var(--grass-3);
    }
    &--2 {
      outline-color: var(--amber-6);
      color: var(--amber-11);
      background: var(--amber-1);
      ---bg: var(--amber-3);
    }
    &grade {
      grid-area: grade;
      text-align: center;
      padding-top: 0.5rem;
      font-size: 0.75rem;
    }
    &image {
      grid-area: image;
      display: flex;
      justify-content: center;
      // align-items: start;
      padding: 0 1rem 1rem 1rem;
    }
    &name {
      grid-area: name;
      text-align: center;
      font-size: 2rem;
      font-weight: bold;
      padding: 0.5rem;
    }
    &ingredients-title {
      grid-area: ingredients-title;
      text-align: center;
      background: var(---bg);
      padding-top: 0.5rem;
      border-radius: 0.5rem 0.5rem 0 0;
    }
    &ingredients-items {
      grid-area: ingredients-items;
      display: flex;
      background: var(---bg);
      justify-content: center;
      padding: 0.5rem 0;
      gap: 0.5rem;
    }
    &ingredients-item {
      all: unset;
    }
  }
</style>

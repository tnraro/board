<script lang="ts">
  import { ingredientData } from "./ingredient.data";
  import { selectedIngredient } from "./ingredient-state.svelte";

  interface Props {
    id: string;
    disabled?: boolean;
  }
  let { id, disabled } = $props<Props>();
  let info = $derived(ingredientData.get(id)!);
</script>

<div
  class="_"
  class:_--is-special={info.isSpecial}
  class:_--disabled={disabled}
  class:_--highlight={selectedIngredient.value === info.id}
>
  <img
    class="_img"
    alt=""
    draggable="false"
    src={info.image}
    title={info.name}
  />
</div>

<style lang="scss">
  ._ {
    position: relative;
    pointer-events: none;
    user-select: none;
    border-radius: 0.5rem;
    &img {
      aspect-ratio: 1/1;
      border-radius: 0.5rem;
      object-fit: cover;
      height: 3rem;
      padding: 0.5rem;
      background: hsl(0deg 0% 0% / 0.05);
    }
    &--highlight {
      outline: 2px solid var(--blue-7);
      background: hsl(0deg 0% 100% / 0.7);
    }
    &--disabled:not(&--highlight) {
      mix-blend-mode: luminosity;
    }
    &--is-special {
      &::before {
        position: absolute;
        content: "";

        border-bottom: 0.4rem solid transparent;
        border-left: 0.4rem solid var(--tomato-9);
        border-right: 0.4rem solid var(--tomato-9);
        width: 0.4rem;
        height: 0.8rem;
        left: 10%;
        top: -0.1rem;
        border-radius: 0.1rem 0.1rem 0 0;
      }
    }
  }
</style>

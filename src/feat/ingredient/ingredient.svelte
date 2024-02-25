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

<img
  class="_"
  class:_--highlight={selectedIngredient.value === info.id}
  class:_--disabled={disabled}
  alt=""
  draggable="false"
  src={info.image}
  title={info.name}
/>

<style lang="scss">
  ._ {
    aspect-ratio: 1/1;
    object-fit: cover;
    height: 3rem;
    border-radius: 0.5rem;
    padding: 0.5rem;
    background: hsl(0deg 0% 0% / 0.05);
    user-select: none;
    pointer-events: none;
    &--highlight {
      outline: 2px solid var(--blue-7);
      background: hsl(0deg 0% 100% / 0.7);
    }
    &--disabled:not(&--highlight) {
      mix-blend-mode: luminosity;
    }
  }
</style>

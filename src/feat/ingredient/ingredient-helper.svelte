<script lang="ts">
  import { selectedIngredient } from "./ingredient-state.svelte";
</script>
<svelte:window
  onclick={(e) => {
    const target = e.target as HTMLElement;
    console.log(target);
    if (target.classList.contains("ingredient")) {
      selectedIngredient.value = target.dataset.id;
    } else {
      selectedIngredient.value = undefined;
    }
  }}
/>

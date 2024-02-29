<script lang="ts">
  import OrderCard from "../order-card/order-card.svelte";

  interface Props {
    data: string[][];
  }
  let { data } = $props<Props>();
</script>

<div class="_">
  {#each data as cards, i}
    <div class="_queue">
      <div class="_no">
        {i + 1}
      </div>
      <div class="_cards">
        {#each cards as card}
          <OrderCard id={card} />
        {/each}
      </div>
    </div>
  {/each}
</div>

<style lang="scss">
  ._ {
    &queue {
      display: flex;
      height: 16rem;
      // margin-bottom: -7rem;
    }
    &no {
      display: grid;
      place-items: center;
      font-weight: bold;
      width: 2rem;
      flex-shrink: 0;
    }
    &cards {
      display: flex;
      gap: calc(2px + 0.5rem);
    }
  }
</style>
